package com.example.demo.models;

public class reviewCreateViewModel {
   private int user_id;
   private String movie_name;
   private int rating;
   private String reviewText;

    public reviewCreateViewModel(int user_id, String movie_name, int rating, String reviewText) {
        this.user_id = user_id;
        this.movie_name = movie_name;
        this.rating = rating;
        this.reviewText = reviewText;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getMovie_name() {
        return movie_name;
    }

    public void setMovie_name(String movie_name) {
        this.movie_name = movie_name;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }
}
