package com.example.demo.controller;

import com.example.demo.models.authenticationCheckToken;
import com.example.demo.models.authenticationResponse;
import com.example.demo.entities.User;
import com.example.demo.models.signUpViewModel;
import com.example.demo.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/authenticate")
public class AuthenticationController {
    private final AuthenticationService authService;
    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }
    @PostMapping("/register")
    public ResponseEntity<authenticationResponse> register(@RequestBody signUpViewModel request)
    {
        return ResponseEntity.ok(authService.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<authenticationResponse> login(@RequestBody User request)
    {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/refresh_token")
    public ResponseEntity refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    )
    {
        return authService.refreshToken(request, response);
    }

    @PostMapping("/check_token")
    public ResponseEntity checkToken(@RequestBody authenticationCheckToken user)
    {
        return authService.checkToken(user);
    }
}