package com.arturjakubowski.horizondrive.handler;

import com.arturjakubowski.horizondrive.model.FileMtd;
import com.arturjakubowski.horizondrive.model.User;
import com.arturjakubowski.horizondrive.repository.UserRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Objects;

@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserHandlerImpl implements UserHandler {

    UserRepository userRepository;

    @Override
    public Mono<ServerResponse> getUsernames(ServerRequest request) {
        var usernames = userRepository.findAll().map(User::getUsername);
        return ServerResponse.ok().body(usernames, String.class);
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
                    Files.walk(dir)
                            .sorted(Comparator.reverseOrder())
                            .map(Path::toFile)
                            .forEach(File::delete);
                })
                .flatMap(userRepository::deleteByUsername)
                .map(ServerResponse::noContent);
    }
}
