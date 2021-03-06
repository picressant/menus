package fr.choupiteam.menus.application.security.filter;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import fr.choupiteam.menus.application.security.google.GoogleLoginVerifier;
import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.application.security.model.SecurityConstants;
import fr.choupiteam.menus.application.security.service.UserDetailsServiceImpl;
import fr.choupiteam.menus.infrastructure.rest.error.ResponseError;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final Logger log = LoggerFactory.getLogger(this.getClass());


    private AuthenticationManager authenticationManager;
    private UserDetailsServiceImpl userService;


    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, UserDetailsServiceImpl userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) {
        try {
            HashMap<String, String> dataReq = new ObjectMapper()
                    .readValue(req.getInputStream(), HashMap.class);


            if (dataReq.containsKey("googleid")) {
                GoogleIdToken.Payload payload = GoogleLoginVerifier.verifyToken(dataReq.get("googleid"));
                ApplicationUser user = this.userService.getUserByGoogleId(payload.getUserId()).orElseThrow(() -> new BadCredentialsException(""));
                return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            }
            else {
                return authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                dataReq.get("username"),
                                dataReq.get("password"),
                                new ArrayList<>())
                );
            }


        }
        catch (AuthenticationException e) {
            String reason = "";
            if (e instanceof BadCredentialsException) {
                reason = "Identifiants incorrects";
            }
            else {
                reason = "Identification impossible";
                e.printStackTrace();
            }
            ResponseError error = new ResponseError();
            error.setMessage(reason);
            error.setE(e);

            res.setStatus(HttpStatus.UNAUTHORIZED.value());
            try {
                res.getWriter().write(convertObjectToJson(error));
            }
            catch (IOException ex) {
                log.error(ex.getMessage(), ex.getCause());
            }

            return null;
        }
        catch (IOException | GeneralSecurityException e) {
            throw new RuntimeException(e);
        }

    }

    private String convertObjectToJson(Object object) {
        if (object == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(object);
        }
        catch (JsonProcessingException e) {
            return null;
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {
        String token = Jwts.builder()
                .setSubject(((ApplicationUser) auth.getPrincipal()).getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET)
                .compact();
        res.getWriter().write("{\"token\":\"" + token + "\"}");
        res.getWriter().flush();
        res.getWriter().close();
    }
}
