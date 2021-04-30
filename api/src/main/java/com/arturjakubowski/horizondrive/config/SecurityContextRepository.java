package com.arturjakubowski.horizondrive.config;

import com.arturjakubowski.horizondrive.constants.Global;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Configuration
@Slf4j
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityContextRepository implements ServerSecurityContextRepository {

    AuthenticationManager authenticationManager;

    @Override
    public Mono<SecurityContext> load(ServerWebExchange swe) {
        ServerHttpRequest request = swe.getRequest();
        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        String authToken = null;

        if (authHeader != null && authHeader.startsWith(Global.TOKEN_PREFIX)) {
            authToken = authHeader.substring(7);
        }

        if (authToken == null) {
            log.warn("Couldn't find bearer string, will ignore the header.");
            return Mono.empty();
        }
        return authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authToken, authToken))
                .map(SecurityContextImpl::new);
    }

    @Override
    public Mono<Void> save(ServerWebExchange swe, SecurityContext sc) {
        throw new UnsupportedOperationException();
    }
}
