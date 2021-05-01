package com.arturjakubowski.horizondrive.router;

import com.arturjakubowski.horizondrive.handler.AuthHandler;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static com.arturjakubowski.horizondrive.constants.Endpoints.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;

@Configuration
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthRouter {

    AuthHandler authHandler;

    @Bean
    public RouterFunction<ServerResponse> authRoute() {
        return RouterFunctions
                .route(POST(LOGIN).and(accept(APPLICATION_JSON)), authHandler::login)
                .andRoute(GET("/test").and(accept(APPLICATION_JSON)), authHandler::test)
                .andRoute(POST(REGISTER).and(accept(APPLICATION_JSON)), authHandler::register);
    }
}
