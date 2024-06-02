package com.example.demo.controller;

import com.example.demo.models.reviewCreateViewModel;
import com.example.demo.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createReview(@RequestBody reviewCreateViewModel request) {
        return reviewService.createReview(request);
    }
    @GetMapping("/test")
    public ResponseEntity test() {
        return ResponseEntity.ok("Test");
    }
}
