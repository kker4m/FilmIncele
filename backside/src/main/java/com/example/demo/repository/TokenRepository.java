package com.example.demo.repository;

import com.example.demo.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {
    @Query("SELECT t FROM Token t INNER JOIN t.user u WHERE u.id = ?1 AND t.loggedOut = FALSE")
    List<Token> findAllAccessTokensByUser(Integer userId);

    Optional<Token> findByAccessToken(String token);

    Optional<Token > findByRefreshToken(String token);
}