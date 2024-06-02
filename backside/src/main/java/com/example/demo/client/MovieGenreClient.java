package com.example.demo.client;

import com.example.demo.adapter.MovieToGenreAdapter;
import com.example.demo.entities.Genre;
import com.example.demo.entities.Movie;

public class MovieGenreClient {
    public void displayGenre(Genre genre) {
        System.out.println("Genre: " + genre.getGenreName());
    }

}
