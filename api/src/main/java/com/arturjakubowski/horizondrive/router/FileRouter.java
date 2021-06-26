package com.arturjakubowski.horizondrive.router;

import com.arturjakubowski.horizondrive.constants.Endpoints;
import com.arturjakubowski.horizondrive.handler.FileHandler;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.*;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;

@Configuration
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FileRouter {

    FileHandler fileHandler;

    @Bean
    RouterFunction<ServerResponse> fileRoute() {
        return RouterFunctions
                .route(GET(Endpoints.GET_FILES).and(accept(APPLICATION_JSON)), fileHandler::findAll)
                .andRoute(GET(Endpoints.GET_SHARED).and(accept(APPLICATION_JSON)), fileHandler::findShared)
                .andRoute(GET(Endpoints.DOWNLOAD_FILE).and(accept(APPLICATION_JSON)), fileHandler::download)
                .andRoute(POST(Endpoints.UPLOAD_FILE).and(accept(MULTIPART_FORM_DATA)), fileHandler::upload)
                .andRoute(PUT(Endpoints.UPDATE_FILE).and(accept(APPLICATION_JSON)), fileHandler::update)
                .andRoute(DELETE(Endpoints.DELETE_FILE).and(accept(APPLICATION_JSON)), fileHandler::delete);
    }
}
