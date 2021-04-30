package com.arturjakubowski.horizondrive.handler;

import com.arturjakubowski.horizondrive.model.FolderMtd;
import com.arturjakubowski.horizondrive.payloads.FolderRequest;
import com.arturjakubowski.horizondrive.repository.FolderMtdRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.util.Date;

@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class FolderHandlerImpl implements FolderHandler {

    FolderMtdRepository folderMtdRepository;

    @Override
    public Mono<ServerResponse> getFolders(ServerRequest request) {
        var data = request.principal()
                .map(Principal::getName)
                .flatMapMany(folderMtdRepository::findByOwner);
        return ServerResponse.ok().body(data, FolderMtd.class);
    }

    @Override
    public Mono<ServerResponse> createFolder(ServerRequest request) {
        return request.principal()
                .map(Principal::getName)
                .flatMap(user -> request.bodyToMono(FolderRequest.class)
                        .flatMap(folder -> folderMtdRepository.insert(buildFolderMtd(folder, user))))
                .flatMap(res -> ServerResponse.ok().build());
    }

    @Override
    public Mono<ServerResponse> updateFolder(ServerRequest request) {
        return request.principal()
                .map(Principal::getName)
                .flatMap(user -> request.bodyToMono(FolderRequest.class)
                        .flatMap(folderRequest -> {
                            String id = request.pathVariable("id");
                            return folderMtdRepository.findById(id).flatMap(folder -> {
                                folder.setFolderName(folderRequest.getName());
                                folder.setColor(folderRequest.getColor());
                                return folderMtdRepository.save(folder);
                            });
                        })).flatMap(res -> ServerResponse.ok().build());
    }

    @Override
    public Mono<ServerResponse> deleteFolder(ServerRequest request) {
        return request.principal()
                .map(Principal::getName)
                .flatMap(user -> {
                    String id = request.pathVariable("id");
                    return folderMtdRepository.findById(id)
                            .filter(folder -> folder.getOwner().equals(user))
                            .flatMap(found -> {
                                if (found == null) {
                                    return ServerResponse.badRequest().build();
                                }
                                return folderMtdRepository.deleteById(id)
                                        .flatMap(res -> ServerResponse.noContent().build());
                            });
                });
    }

    private FolderMtd buildFolderMtd(FolderRequest request, String owner) {
        return FolderMtd.builder()
                .folderName(request.getName())
                .color(request.getColor())
                .createdAt(new Date())
                .owner(owner)
                .build();
    }
}
