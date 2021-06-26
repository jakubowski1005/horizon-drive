package com.arturjakubowski.horizondrive.constants;

public class Endpoints {
    public static final String REGISTER = "/auth/register";
    public static final String LOGIN = "/auth/login";

    public static final String USER_INFO = "/me";
    public static final String USERNAMES = "/users";
    public static final String DELETE_ACCOUNT = "/users";

    public static final String GET_FOLDERS = "/folders";
    public static final String CREATE_FOLDER = "/folders";
    public static final String UPDATE_FOLDER = "/folders/{id}";
    public static final String DELETE_FOLDER = "/folders/{id}";

    public static final String GET_FILES = "/files";
    public static final String GET_SHARED = "/shared";
    public static final String UPLOAD_FILE = "/files";
    public static final String DOWNLOAD_FILE = "/files/{id}";
    public static final String UPDATE_FILE = "/files/{id}";
    public static final String DELETE_FILE = "/files/{id}";

    public static final String[] UNAUTHENTICATED_ROUTES = new String[] { REGISTER, LOGIN, "/test" };
}
