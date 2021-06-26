package com.arturjakubowski.horizondrive.handler;

import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

public interface UserHandler {
    Mono<ServerResponse> getUsernames(ServerRequest request);
    Mono<ServerResponse> getUserInfo(ServerRequest request);
    Mono<ServerResponse> resetPassword(ServerRequest request);
    Mono<ServerResponse> activateAccount(ServerRequest request);
    Mono<ServerResponse> deleteAccount(ServerRequest request);

}
