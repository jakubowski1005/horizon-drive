package com.arturjakubowski.horizondrive.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Set;

@Document
@Data
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id String id;
    @Indexed String username;
    String email;
    @JsonIgnore String password;
    @JsonIgnore Set<String> roles;
    Date createdAt;
    @JsonIgnore Boolean isActive;
    Double freeSpace;
}
