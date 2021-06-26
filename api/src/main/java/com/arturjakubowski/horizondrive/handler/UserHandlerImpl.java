package com.arturjakubowski.horizondrive.handler;

import com.arturjakubowski.horizondrive.model.User;
import com.arturjakubowski.horizondrive.payloads.UserInfoResponse;
import com.arturjakubowski.horizondrive.repository.UserRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.Comparator;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserHandlerImpl implements UserHandler {

    UserRepository userRepository;

    @Override
    public Mono<ServerResponse> getUsernames(ServerRequest request) {
        return userRepository.findAll()
                .collectList()
                .map(users -> users.stream().map(User::getUsername).collect(Collectors.toList()))
                .flatMap(usernames -> ServerResponse.ok().body(BodyInserters.fromValue(usernames)));
    }

    @Override
    public Mono<ServerResponse> getUserInfo(ServerRequest request) {
        return request.principal()
                .map(Principal::getName)
                .flatMap(userRepository::findByUsername)
                .flatMap(user -> {
                    var userInfo = new UserInfoResponse(user.getId(), user.getUsername(), user.getFreeSpace());
                    return ServerResponse.ok().body(BodyInserters.fromValue(userInfo));
                });
    }

    @Override
    public Mono<ServerResponse> resetPassword(ServerRequest request) {
        return null;
    }

    @Override
    public Mono<ServerResponse> activateAccount(ServerRequest request) {
        return null;
    }

    @Override
    public Mono<ServerResponse> deleteAccount(ServerRequest request) {
        return request.principal()
                .map(Principal::getName)
                .doOnNext(user -> {
                    var dir = Paths.get("src/main/resources/files/" + user);
                    try {
                        Files.walk(dir)
                                .sorted(Comparator.reverseOrder())
                                .map(Path::toFile)
                                .forEach(File::delete);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                })
                .flatMap(user -> userRepository.deleteByUsername(user)
                    .flatMap(res -> ServerResponse.noContent().build()));
    }
}
