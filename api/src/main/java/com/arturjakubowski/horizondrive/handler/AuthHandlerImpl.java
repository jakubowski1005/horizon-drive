package com.arturjakubowski.horizondrive.handler;

import com.arturjakubowski.horizondrive.constants.Global;
import com.arturjakubowski.horizondrive.constants.Roles;
import com.arturjakubowski.horizondrive.model.User;
import com.arturjakubowski.horizondrive.payloads.LoginRequest;
import com.arturjakubowski.horizondrive.payloads.LoginResponse;
import com.arturjakubowski.horizondrive.payloads.RegisterRequest;
import com.arturjakubowski.horizondrive.repository.UserRepository;
import com.arturjakubowski.horizondrive.utils.JwtProvider;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Set;

import static org.springframework.http.MediaType.APPLICATION_JSON;

@Service
@Slf4j
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthHandlerImpl implements AuthHandler{

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    JwtProvider tokenProvider;

    @Override
    public Mono<ServerResponse> test(ServerRequest request) {
        return ServerResponse.ok().body(BodyInserters.fromValue("Test connection - success"));
    }

    @Override
    public Mono<ServerResponse> login(ServerRequest request) {
        return request.bodyToMono(LoginRequest.class)
                .log()
                .flatMap(body -> userRepository.findByUsername(body.getUsername())
                        .log()
                        .flatMap(this::checkIfActive)
                        .flatMap(user -> checkPassword(body, user))
                        .switchIfEmpty(ServerResponse.badRequest()
                                .body(BodyInserters.fromValue(Global.USER_NOT_EXIST))));
    }

    @Override
    public Mono<ServerResponse> register(ServerRequest request) {
        return request.bodyToMono(RegisterRequest.class)
                .flatMap(registerRequest -> userRepository.findByUsername(registerRequest.getUsername())
                        .flatMap(dbUser -> ServerResponse.badRequest().body(BodyInserters.fromValue(Global.USERNAME_EXIST)))
                        .switchIfEmpty(userRepository.save(buildUserFromRequest(registerRequest))
                                .flatMap(this::createFolder)
                                .flatMap(savedUser -> ServerResponse.ok()
                                        .contentType(APPLICATION_JSON)
                                        .body(BodyInserters.fromValue(savedUser)))));
    }

    private Mono<User> checkIfActive(User user) {
        return (user == null || !user.getIsActive()) ? Mono.empty() : Mono.just(user);
    }

    private Mono<ServerResponse> checkPassword(LoginRequest request, User user) {
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            var res = ServerResponse.ok()
                    .contentType(APPLICATION_JSON)
                    .body(BodyInserters.fromValue(
                            new LoginResponse(Global.TOKEN_PREFIX, tokenProvider.generateToken(user)))
                    );
            log.debug(res.toString());
            return res;
        }
        System.out.println();
        return ServerResponse.badRequest().body(BodyInserters.fromValue(Global.PASSWORD_NOT_FOUND));
    }

    private User buildUserFromRequest(RegisterRequest registerRequest) {
        return User.builder()
                .username(registerRequest.getUsername())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .roles(Set.of(Roles.USER.name()))
                .isActive(true)
                .createdAt(new Date())
                .email(registerRequest.getEmail())
                .build();
    }

    private Mono<?> createFolder(User user) {
        String basePath = "/Users/arturjakubowski/Documents/repos/horizon-drive/api/src/main/resources/files/";
        Path path = Paths.get(basePath + user.getUsername());
        System.out.println(path);
        return Mono.fromRunnable(() -> {
            try {
                Files.createDirectory(path);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).publishOn(Schedulers.boundedElastic());
    }
}
