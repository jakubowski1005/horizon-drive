package com.arturjakubowski.horizondrive.testupload;

import com.arturjakubowski.horizondrive.constants.Endpoints;
import com.arturjakubowski.horizondrive.handler.AuthHandler;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;

@Configuration
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UploadRouter {

    UploadHandler uploadHandler;

    @Bean
    public RouterFunction<ServerResponse> uploadRoute() {
        return RouterFunctions
                .route(POST("/upload").and(accept(MULTIPART_FORM_DATA)), uploadHandler::upload);
    }
}
