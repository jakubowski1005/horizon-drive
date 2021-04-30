package com.arturjakubowski.horizondrive.handler;

import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

public interface FolderHandler {
    Mono<ServerResponse> getFolders(ServerRequest request);
    Mono<ServerResponse> createFolder(ServerRequest request);
    Mono<ServerResponse> updateFolder(ServerRequest request);
    Mono<ServerResponse> deleteFolder(ServerRequest request);
}
