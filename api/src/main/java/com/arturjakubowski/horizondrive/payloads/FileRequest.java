package com.arturjakubowski.horizondrive.payloads;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FileRequest {
    String filename;
    Set<String> folders;
    Set<String> sharedFor;
}
