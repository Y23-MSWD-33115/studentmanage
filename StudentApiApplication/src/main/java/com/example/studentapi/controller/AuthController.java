package com.example.studentapi.controller;

import com.example.studentapi.model.User;
import com.example.studentapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // simple check if username exists
        if (userService.login(user.getUsername(), user.getPassword()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message","User already exists"));
        }
        User saved = userService.register(user);
        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
        String username = body.get("username");
        String password = body.get("password");
        var u = userService.login(username, password);
        if (u.isPresent()) return ResponseEntity.ok(u.get());
        return ResponseEntity.status(401).body(Map.of("message","Invalid credentials"));
    }
}
