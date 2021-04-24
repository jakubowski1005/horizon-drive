package com.arturjakubowski.horizondrive.utils;

import com.arturjakubowski.horizondrive.constants.Global;
import com.arturjakubowski.horizondrive.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtProvider {

    @Value("${token.key}") String secret;
    @Value("${token.expiration}") String expirationTime;
    Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(User user) {
        Map<String, Set<String>> claims = new HashMap<>();
        claims.put(Global.ROLES, user.getRoles());

        long expiration = Long.parseLong(expirationTime);
        Date createdAt = new Date();
        Date expiredAt = new Date(createdAt.getTime() + expiration * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getUsername())
                .setIssuedAt(createdAt)
                .setExpiration(expiredAt)
                .signWith(key)
                .compact();
    }

    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUsernameFromToken(String token) {
        return getAllClaimsFromToken(token).getSubject();
    }

    public Date getExpirationTimeFromToken(String token) {
        return getAllClaimsFromToken(token).getExpiration();
    }

    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    public Boolean isTokenExpired(String token) {
        return getExpirationTimeFromToken(token).before(new Date());
    }
}
