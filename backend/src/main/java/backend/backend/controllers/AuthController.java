package backend.backend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import backend.backend.dto.AuthResponse;
import backend.backend.dto.LoginRequest;
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

    // @PostMapping("/login")
    // public AuthResponse login(@RequestBody LoginRequest request) throws Exception
    // {
    // User user = authService.login(request.getEmail(), request.getPassword());
    // AuthResponse response = new AuthResponse();
    // response.setMessage("Login successful");
    // response.setUsername(user.getUsername());
    // response.setEmail(user.getEmail());
    // response.setRole(user.getRole());
    // return response;
    // }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = authService.login(request.getEmail(), request.getPassword());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("user", Map.of(
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "role", user.getRole()));

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid username or password"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Server error: " + e.getMessage()));
        }
    }

}