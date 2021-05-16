package com.arturjakubowski.horizondrive.handler;

import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

public interface FileHandler {
    Mono<ServerResponse> findAll(ServerRequest request);
    Mono<ServerResponse> findShared(ServerRequest request);
    Mono<ServerResponse> upload(ServerRequest request);
    Mono<ServerResponse> update(ServerRequest request);
    Mono<ServerResponse> delete(ServerRequest request);
}
