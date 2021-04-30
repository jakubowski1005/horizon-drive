package com.arturjakubowski.horizondrive.utils;

import java.io.File;

public class FileUtils {

    private FileUtils() {}

    public static String trimExtension(String filename) {
        String[] temp = filename.split("\\.");
        return temp.length > 1 ? temp[0] : null;
    }

    public static String fileType(String filename) {
        String[] temp = filename.split("\\.");
        if (temp.length < 1) return null;
        return temp[temp.length-1];
    }

    public static Double fileSize(File file) {
        return (double) file.length() / 1024;
    }

    public static String trimFilename(String filename, Integer length) {
        length = (length - 3) / 2;
        return filename.substring(0, length) +
                "..." +
                filename.substring(filename.length() - 1 - length, filename.length() - 1);

    }

    public static Boolean renameFile(String owner, String oldName, String newName) {
        String extension = FileUtils.fileType(oldName);
        newName +=  "." + extension;
        File oldFile = new File("src/main/resources/files/" + owner + "/" + oldName);
        File newFile = new File("src/main/resources/files/" + owner + "/" + newName);
        return oldFile.renameTo(newFile);
    }

    public static Boolean deleteFile(String owner, String filename) {
        File file = new File("src/main/resources/files/" + owner + "/" + filename);
        return file.delete();
    }
}
