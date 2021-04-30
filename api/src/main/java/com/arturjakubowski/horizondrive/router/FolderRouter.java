package com.arturjakubowski.horizondrive.router;

import com.arturjakubowski.horizondrive.handler.FolderHandler;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static com.arturjakubowski.horizondrive.constants.Endpoints.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;


@Configuration
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FolderRouter {

    FolderHandler folderHandler;

    @Bean
    public RouterFunction<ServerResponse> folderRoute() {
        return RouterFunctions
                .route(GET(GET_FOLDERS).and(accept(APPLICATION_JSON)), folderHandler::getFolders)
                .andRoute(POST(CREATE_FOLDER).and(accept(APPLICATION_JSON)), folderHandler::createFolder)
                .andRoute(PUT(UPDATE_FOLDER).and(accept(APPLICATION_JSON)), folderHandler::updateFolder)
                .andRoute(DELETE(DELETE_FOLDER).and(accept(APPLICATION_JSON)), folderHandler::deleteFolder);
    }
}
