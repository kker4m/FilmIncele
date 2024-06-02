package com.example.demo.models;

public class authenticationCheckToken {
    private String email;
    private String authToken;

    public authenticationCheckToken(String email, String token) {
        this.email = email;
        this.authToken = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return authToken;
    }

    public void setToken(String token) {
        this.authToken = token;
    }
}
