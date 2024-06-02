package com.example.demo.service;

import com.example.demo.entities.Category;
import com.example.demo.entities.Genre;
import com.example.demo.entities.Movie;
import com.example.demo.models.movieCreateViewModel;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.GenreRepository;
import com.example.demo.repository.MovieRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieService {

    private static MovieService instance;
    private static MovieRepository movieRepository;
    private static GenreRepository genreRepository;
    private static CategoryRepository categoryRepository;

    private MovieService(MovieRepository movieRepository, GenreRepository genreRepository, CategoryRepository categoryRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
        this.categoryRepository = categoryRepository;
    }

    public static synchronized MovieService getInstance() {
        if (instance == null) {
            instance = new MovieService(movieRepository, genreRepository, categoryRepository);
        }
        return instance;
    }

    public void createMovie(movieCreateViewModel request) {
        Genre gennre = new Genre();
        gennre.setGenreName(request.getGenreName());
        genreRepository.save(gennre);

        Category category1 = new Category();
        category1.setCategoryName(request.getCategoryName());
        categoryRepository.save(category1);

        Movie movie = new Movie();
        movie.setTitle(request.getTitle());
        movie.setReleaseYear(request.getReleaseYear());
        movie.setDirector(request.getDirector());
        movie.setCasts(request.getCast());
        movie.setGenre(gennre);
        movie.setDescription(request.getDescription());
        movie.setCategory(category1);
        movieRepository.save(movie);
    }



    public ResponseEntity<Void> checkMovie(String title) {
        boolean exists = movieRepository.existsByTitle(title);
        if (exists) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
