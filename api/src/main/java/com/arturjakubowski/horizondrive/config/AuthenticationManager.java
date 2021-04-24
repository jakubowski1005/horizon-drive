package com.arturjakubowski.horizondrive.config;

import com.arturjakubowski.horizondrive.constants.Global;
import com.arturjakubowski.horizondrive.utils.JwtProvider;
import io.jsonwebtoken.Claims;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationManager implements ReactiveAuthenticationManager {

    JwtProvider tokenProvider;

    @Override
    @SuppressWarnings("unchecked")
    public Mono<Authentication> authenticate(Authentication authentication) {
        String authToken = authentication.getCredentials().toString();
        String username;
        try {
            username = tokenProvider.getUsernameFromToken(authToken);
        } catch (Exception e) {
            username = null;
        }
        if (username != null && ! tokenProvider.isTokenExpired(authToken)) {
            Claims claims = tokenProvider.getAllClaimsFromToken(authToken);

            List<String> roles = claims.get(Global.ROLES, List.class);
            List<? extends GrantedAuthority> authorities = roles.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, username, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return Mono.just(auth);
        } else {
            return Mono.empty();
        }
    }
}
