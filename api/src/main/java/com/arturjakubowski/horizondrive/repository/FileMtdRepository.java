package com.arturjakubowski.horizondrive.repository;

import com.arturjakubowski.horizondrive.model.FileMtd;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface FileMtdRepository extends ReactiveMongoRepository<FileMtd, String> {
    Flux<FileMtd> findByOwner(String owner);
}
