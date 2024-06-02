package com.example.demo.service;

import com.example.demo.entities.User;
import com.example.demo.models.signUpViewModel;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static UserService instance;
    private final UserRepository userRepository;

    private UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static synchronized UserService getInstance(UserRepository userRepository) {
        if (instance == null) {
            instance = new UserService(userRepository);
        }
        return instance;
    }

    public User registerUser(signUpViewModel signUpVM) {
        User user = new User();
        user.setUsername(signUpVM.getUsername());
        user.setPassword(signUpVM.getPassword());

        return userRepository.save(user);
    }
}

