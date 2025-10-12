package backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    
    // Optional: find user by username or email
    User findByUsername(String username);

    User findByEmail(String email);
}
