package com.arturjakubowski.horizondrive.repository;

import com.arturjakubowski.horizondrive.model.FolderMtd;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface FolderMtdRepository extends ReactiveMongoRepository<FolderMtd, String> {
    Flux<FolderMtd> findByOwner(String owner);
}
