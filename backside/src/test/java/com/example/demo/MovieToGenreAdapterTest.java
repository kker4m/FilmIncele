package com.example.demo;
import com.example.demo.adapter.MovieToGenreAdapter;
import com.example.demo.client.MovieGenreClient;
import com.example.demo.entities.Genre;
import com.example.demo.entities.Movie;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class MovieToGenreAdapterTest {

    @Test
    public void testGetGenreName() {
        Movie movie = new Movie();
        movie.setTitle("The Dark Knight");
        movie.setReleaseYear(2008);
        movie.setDirector("Christopher Nolan");

        movie.setCasts("Christian Bale, Heath Ledger, Aaron Eckhart");
        Genre createdGenre = new Genre();
        createdGenre.setGenreName("Action");
        movie.setGenre(createdGenre);

        Genre movieGenre = new MovieToGenreAdapter(movie);

        MovieGenreClient client = new MovieGenreClient();
        client.displayGenre(movieGenre);

        assertEquals("Action", movieGenre.getGenreName());
    }
}