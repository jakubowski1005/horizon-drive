package com.arturjakubowski.horizondrive.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Set;

@Document
@Data
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FileMtd {
    @Id String id;
    String filename;
    String filetype;
    Double filesize;
    String downloadUrl;
    String relativePath;
    String owner;
    Set<String> folders;
    Set<String> sharedFor;
    Date createdAt;
}
