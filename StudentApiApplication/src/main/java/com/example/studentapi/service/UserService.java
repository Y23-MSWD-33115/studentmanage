package com.example.studentapi.service;

import com.example.studentapi.model.User;
import com.example.studentapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    public UserService(UserRepository repo) { this.repo = repo; }

    public User register(User u) {
        u.setPassword(encoder.encode(u.getPassword()));
        return repo.save(u);
    }

    public Optional<User> login(String username, String rawPassword) {
        var userOpt = repo.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (encoder.matches(rawPassword, user.getPassword())) {
                // remove password before returning (optional)
                user.setPassword(null);
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}
