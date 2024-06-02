package com.example.demo.controller;

import com.example.demo.models.movieCreateViewModel;
import com.example.demo.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movie")
public class MovieController {
    private final MovieService movieService;
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/create")
    public void createMovie(@RequestBody movieCreateViewModel request) {
        movieService.createMovie(request);
    }

    @GetMapping("/title")
    public ResponseEntity<Void> checkMovie(@RequestParam String title) {
        return movieService.checkMovie(title);
    }

    @GetMapping("/test")
    public ResponseEntity test() {
        return ResponseEntity.ok("Test");
    }
}
