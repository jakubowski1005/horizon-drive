//package com.arturjakubowski.horizondrive.config;
//
//import org.springframework.http.HttpHeaders;
//import org.springframework.stereotype.Component;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.server.ServerWebExchange;
//import org.springframework.web.server.WebFilter;
//import org.springframework.web.server.WebFilterChain;
//import reactor.core.publisher.Mono;
//
//@Component
//public class AddControlHeaderWebFilter implements WebFilter {
//
//    @Override
//    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
//        var headers = new HttpHeaders();
//        headers.add("Access-Control-Allow-Headers", "*");
//        headers.add("Access-Control-Allow-Origin", "*");
//        exchange.getResponse()
//                .getHeaders()
//                .addAll(headers);
//        return chain.filter(exchange);
//    }
//}
