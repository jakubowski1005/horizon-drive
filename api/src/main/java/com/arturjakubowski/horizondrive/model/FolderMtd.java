package com.arturjakubowski.horizondrive.model;


import com.arturjakubowski.horizondrive.constants.FolderColor;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FolderMtd {

    @Id String id;
    String folderName;
    FolderColor color;
    String owner;
    Date createdAt;
}
