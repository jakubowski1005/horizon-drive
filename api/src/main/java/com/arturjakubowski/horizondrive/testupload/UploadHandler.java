package com.arturjakubowski.horizondrive.testupload;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyExtractors;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.io.File;
import java.util.Map;

@Service
@Slf4j
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UploadHandler {

    Mono<ServerResponse> upload(ServerRequest request) {
        log.warn("uploading the file...");
        return request
                .body(BodyExtractors.toMultipartData())
                .flatMap(parts -> {
                    Map<String, Part> map = parts.toSingleValueMap();
                    map.forEach((k,v) -> System.out.println(k + ": " + v.toString()));
                    FilePart filePart = (FilePart) map.get("file");
                    String fileName = filePart.filename();
                    filePart
                            .transferTo(new File("src\\main\\resources\\temp\\" + fileName))
                    .subscribe();
                    return ServerResponse.ok().build();
                });
    }
}
