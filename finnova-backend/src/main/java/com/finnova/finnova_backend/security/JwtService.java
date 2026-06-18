package com.finnova.finnova_backend.security;

import org.springframework.stereotype.Service;

@Service
public class JwtService {

    public String generateToken(String username) {
        return "JWT_TOKEN_" + username;
    }

    public String extractUsername(String token) {

        if (token.startsWith("JWT_TOKEN_")) {
            return token.substring(10);
        }

        return null;
    }

    public boolean validateToken(String token, String username) {

        String extractedUsername = extractUsername(token);

        return extractedUsername != null
                && extractedUsername.equals(username);
    }
}