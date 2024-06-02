package com.example.demo.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class authenticationResponse {
    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("message")
    private String message;
    @JsonProperty("username")
    private String username;
    @JsonProperty("user_id")
    private Integer userId;
    @JsonProperty("email")
    private String email;
    public authenticationResponse(String accessToken, String refreshToken, String message, String username, Integer userId, String email) {
        this.accessToken = accessToken;
        this.message = message;
        this.refreshToken = refreshToken;
        this.username = username;
        this.userId = userId;
        this.email = email;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getMessage() {
        return message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}