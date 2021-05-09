package com.arturjakubowski.horizondrive.handler;

import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

public interface AuthHandler {
    Mono<ServerResponse> register(ServerRequest request);
    Mono<ServerResponse> test(ServerRequest request);
    Mono<ServerResponse> login(ServerRequest request);
}
