package com.arturjakubowski.horizondrive.testupload;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.File;
import java.nio.charset.StandardCharsets;

@RestController
@Slf4j
public class UploadController {

    @GetMapping("/connection")
    public String testConnection() {
        return "Connected";
    }
}
