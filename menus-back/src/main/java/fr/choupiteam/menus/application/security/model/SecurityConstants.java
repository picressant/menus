package fr.choupiteam.menus.application.security.model;

public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 1000 * 3600 * 168; // 8 hours
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "authorization";
    public static final String SIGN_UP_URL = "/user/sign-up";
}
