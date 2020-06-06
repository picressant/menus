package fr.choupiteam.menus.application.security.google;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.security.authentication.BadCredentialsException;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

public class GoogleLoginVerifier {

    private static final HttpTransport transport = new NetHttpTransport();
    private static final JsonFactory jsonFactory = new JacksonFactory();
    private static final String CLIENT_ID = "1041951006561-034he6fpudts5a8iuif5cdloifjoqsst.apps.googleusercontent.com";


    public static GoogleIdToken.Payload verifyToken(String idTokenString)
            throws GeneralSecurityException, IOException {
        final GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.
                Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();


        System.out.println("validating:" + idTokenString);

        GoogleIdToken idToken = null;
        try {
            idToken = verifier.verify(idTokenString);
        }
        catch (IllegalArgumentException e) {
            // means token was not valid and idToken
            // will be null
        }

        if (idToken == null) {
            throw new BadCredentialsException("idToken is invalid");
        }

        return idToken.getPayload();
    }
}
