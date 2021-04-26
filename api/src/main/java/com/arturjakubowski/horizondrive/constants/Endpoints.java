package com.arturjakubowski.horizondrive.constants;

public class Endpoints {
    public static final String REGISTER = "/auth/register";
    public static final String LOGIN = "/auth/login";

    public static final String RESET_PASSWORD = "/users/password";
    public static final String DELETE_ACCOUNT = "/users";

    public static final String[] UNAUTHENTICATED_ROUTES = new String[] { REGISTER, LOGIN , "/upload", "/connection"};
}
