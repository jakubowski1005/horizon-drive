package com.arturjakubowski.horizondrive.constants;

public class Global {
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String ROLES = "roles";
    public static final int AUTH_TOKEN_EXPIRATION_HOURS = 24;

    public static final int USERNAME_MIN_LENGTH = 5;
    public static final int USERNAME_MAX_LENGTH = 32;
    public static final String NULL_USERNAME = "Username cannot be null.";
    public static final String EMPTY_USERNAME = "Username cannot be empty.";
    public static final String TOO_SHORT_USERNAME = "Username must have more than 5 characters.";
    public static final String TOO_LONG_USERNAME = "Username must have less than 32 characters.";

    public static final String NULL_EMAIL = "Email cannot be null.";
    public static final String EMPTY_EMAIL = "Email cannot be empty.";
    public static final String WRONG_EMAIL = "Email is not correct.";

    public static final int PASSWORD_MAX_LENGTH = 255;
    public static final String PASSWORD_REGEXP = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";
    public static final String NULL_PASSWORD = "Password cannot be null.";
    public static final String EMPTY_PASSWORD = "Password cannot be empty.";
    public static final String WRONG_PASSWORD = "Password must have minimum eight characters, at least one letter and one number.";
    public static final String TOO_LONG_PASSWORD = "Password is too long.";

    public static final int MESSAGE_MAX_LENGTH = 4096;
    public static final String NULL_MESSAGE = "Message cannot be null.";
    public static final String EMPTY_MESSAGE = "Message cannot be empty.";
    public static final String TOO_LONG_MESSAGE = "Message is too long.";

    public static final String PASSWORD_NOT_FOUND = "Wrong password";
    public static final String USER_NOT_EXIST = "User does not exist";
    public static final String USERNAME_EXIST = "User with the same login exist";

}
