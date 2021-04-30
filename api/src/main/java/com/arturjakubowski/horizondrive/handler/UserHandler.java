package com.arturjakubowski.horizondrive.handler;

import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

public interface UserHandler {
    Mono<ServerResponse> resetPassword(ServerRequest request);
    Mono<ServerResponse> activateAccount(ServerRequest request);
    Mono<ServerResponse> deleteAccount(ServerRequest request);

}
