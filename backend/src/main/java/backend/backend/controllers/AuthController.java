package backend.backend.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import backend.backend.dto.AuthResponse;
import backend.backend.dto.RegisterRequest;
import backend.backend.models.User;
import backend.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173/") // React frontend
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) throws Exception {
        User user = authService.register(request);
        AuthResponse response = new AuthResponse();
        response.setMessage("Registration successful");
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        return response;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody RegisterRequest request) throws Exception {
        User user = authService.login(request.getUsername(), request.getPassword());
        AuthResponse response = new AuthResponse();
        response.setMessage("Login successful");
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        return response;
    }
}