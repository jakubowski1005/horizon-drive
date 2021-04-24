package com.arturjakubowski.horizondrive.repository;

import com.arturjakubowski.horizondrive.model.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveMongoRepository<User, String> {
    Mono<User> findByUsername(String username);
    Mono<Void> deleteByUsername(String username);
}
