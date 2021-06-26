package com.arturjakubowski.horizondrive.handler;

import com.arturjakubowski.horizondrive.model.FileMtd;
import com.arturjakubowski.horizondrive.model.User;
import com.arturjakubowski.horizondrive.payloads.FileRequest;
import com.arturjakubowski.horizondrive.repository.FileMtdRepository;
import com.arturjakubowski.horizondrive.repository.UserRepository;
import com.arturjakubowski.horizondrive.utils.FileUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyExtractors;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.io.File;
import java.net.MalformedURLException;
import java.security.Principal;
import java.util.Date;
import java.util.Map;
import java.util.Set;

@Service
@Slf4j
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class FileHandlerImpl implements FileHandler {

    FileMtdRepository fileMtdRepository;
    UserRepository userRepository;

    @Override
    public Mono<ServerResponse> findAll(ServerRequest request) {
        var data = request.principal()
                .map(Principal::getName)
                .flatMapMany(fileMtdRepository::findByOwner);
        return ServerResponse.ok().body(data, FileMtd.class);
    }

    @Override
    public Mono<ServerResponse> findShared(ServerRequest request) {
        var data = request.principal()
                .map(Principal::getName)
                .flatMapMany(this::findSharedByUser);
        return ServerResponse.ok().body(data, FileMtd.class);
    }

    private Flux<FileMtd> findSharedByUser(String username) {
        return fileMtdRepository.findAll()
                .filter(file -> file.getSharedFor().contains(username));
    }

    @Override
    public Mono<ServerResponse> upload(ServerRequest request) {
        System.out.println("uploading??");
        return request.principal()
                .map(Principal::getName)
                .flatMap(owner -> request.body(BodyExtractors.toMultipartData())
                    .flatMap(parts -> {
                                System.out.println("uploading");
                                Map<String, Part> map = parts.toSingleValueMap();
                                FilePart filePart = (FilePart) map.get("file");
                                String fileName = filePart.filename();
                                File file = new File("src/main/resources/files/" + owner + "/" + fileName);

                                var fileMtd = FileMtd.builder()
                                        .filename(fileName)
                                        .filesize(FileUtils.fileSize(file))
                                        .filetype(FileUtils.fileType(fileName))
                                        .createdAt(new Date())
                                        .owner(owner)
                                        .folders(Set.of())
                                        .sharedFor(Set.of())
                                        .build();

                        System.out.println(fileMtd.toString());
                        recalculateFreeSpace(owner, fileMtd.getFilesize())
                                .subscribe();

                        System.out.println("1");
                        filePart.transferTo(file)
                                .subscribeOn(Schedulers.boundedElastic())
                                .subscribe();
                        System.out.println("2");
                        return fileMtdRepository.insert(fileMtd)
                                        .flatMap(res -> ServerResponse.ok().build());
                            }));
    }

    @Override
    public Mono<ServerResponse> download(ServerRequest request) {
        return Mono.empty();
    }

    @Override
    public Mono<ServerResponse> update(ServerRequest request) {
        return request.principal()
                .map(Principal::getName)
                .flatMap(user -> {
                    String id = request.pathVariable("id");
                    return fileMtdRepository.findById(id)
                            .filter(file -> file.getOwner().equals(user))
                            .flatMap(file -> request.bodyToMono(FileRequest.class)
                                    .flatMap(updatedFile -> {
                                        if (!file.getFilename().equals(updatedFile.getFilename())) {
                                            FileUtils.renameFile(user, file.getFilename(), updatedFile.getFilename());
                                            file.setFilename(updatedFile.getFilename());
                                        }
                                        file.setFolders(updatedFile.getFolders());
                                        file.setSharedFor(updatedFile.getSharedFor());
                                        return fileMtdRepository.save(file);
                                    })
                            );
                }).flatMap(res -> ServerResponse.ok().build());
    }

    @Override
    public Mono<ServerResponse> delete(ServerRequest request) {
        return request.principal()
                .map(Principal::getName)
                .flatMap(user -> {
                    String id = request.pathVariable("id");
                    return fileMtdRepository.findById(id)
                            .filter(file -> file.getOwner().equals(user))
                            .flatMap(file -> {
                                recalculateFreeSpace(user, -1 * file.getFilesize())
                                        .subscribe();
                                FileUtils.deleteFile(user, file.getFilename());
                                return fileMtdRepository.deleteById(id);
                            });
                }).flatMap(res -> ServerResponse.ok().build());
    }

    private Mono<User> recalculateFreeSpace(String username, Double filesize) {
        return userRepository.findByUsername(username)
                .flatMap(user -> {
                    var freeSpace = user.getFreeSpace() - filesize;
                    user.setFreeSpace(freeSpace);
                    return userRepository.save(user);
                });
    }
}
