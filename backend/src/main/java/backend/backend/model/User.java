package backend.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String confirmPwd;
    private String role;

    public User(){}

    public User(Long id, String username, String email, String password, String confirmPwd, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPwd = confirmPwd;
        this.role = role;
    } 
}