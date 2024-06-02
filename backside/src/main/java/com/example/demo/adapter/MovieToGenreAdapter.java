package com.example.demo.adapter;

import com.example.demo.entities.Genre;
import com.example.demo.entities.Movie;
public class MovieToGenreAdapter extends Genre {
    private Movie movie;

    public MovieToGenreAdapter(Movie movie) {
        this.movie = movie;
    }

    @Override
    public String getGenreName() {
        return movie.getGenre().getGenreName();
    }
}
