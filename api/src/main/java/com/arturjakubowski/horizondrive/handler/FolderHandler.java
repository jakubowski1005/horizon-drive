package com.arturjakubowski.horizondrive.handler;

import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

public interface FolderHandler {

    Mono<ServerResponse> createFolder(ServerRequest request);
    Mono<ServerResponse> renameFolder(ServerRequest request);
    Mono<ServerResponse> deleteFolder(ServerRequest request);
}
