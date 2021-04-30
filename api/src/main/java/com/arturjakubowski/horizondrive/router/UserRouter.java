package com.arturjakubowski.horizondrive.router;

import com.arturjakubowski.horizondrive.constants.Endpoints;
import com.arturjakubowski.horizondrive.handler.AuthHandler;
import com.arturjakubowski.horizondrive.handler.UserHandler;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;

@Configuration
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserRouter {

    //UserHandler userHandler;

    @Bean
    public RouterFunction<ServerResponse> userRoute() {
        return null;
//        return RouterFunctions
//                .route(POST(Endpoints.LOGIN).and(accept(APPLICATION_JSON)), userHandler::login)
//                .andRoute(POST(Endpoints.REGISTER).and(accept(APPLICATION_JSON)), userHandler::register);
    }
}
