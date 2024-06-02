package com.example.demo.service;

import com.example.demo.entities.Movie;
import com.example.demo.entities.Review;
import com.example.demo.models.movieCreateViewModel;
import com.example.demo.models.reviewCreateViewModel;
import com.example.demo.repository.MovieRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
public class ReviewService {
    private static ReviewService instance;
    private static ReviewRepository reviewRepository;
    private static UserRepository userRepository;
    private static MovieRepository movieRepository;

    private ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, MovieRepository movieRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    public static synchronized ReviewService getInstance() {
        if (instance == null) {
            instance = new ReviewService(reviewRepository, userRepository, movieRepository);
        }
        return instance;
    }

    public ResponseEntity<Void> createReview(reviewCreateViewModel request) {
        Review review = new Review();
        review.setUser(userRepository.findById(request.getUser_id()).get());
        review.setMovie(movieRepository.findByTitle(request.getMovie_name()).get());
        review.setRating(request.getRating());
        review.setReviewText(request.getReviewText());
        review.setCreatedAt(new Date());
        reviewRepository.save(review);
        return ResponseEntity.ok().build();
    }
}
