package backend.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.backend.model.User;
import backend.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    // Get all user
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

}
