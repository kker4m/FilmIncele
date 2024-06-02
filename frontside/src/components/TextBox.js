import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextBox = ({ user_id, movie_name }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const handleReviewSubmit = async () => {
    const reviewData = {
      user_id: user_id,
      movie_name: movie_name,
      rating: rating,
      reviewText: text
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/reviews/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) { // 200 status kodu kontrolü
        console.log("Review submitted successfully.");
        toast.success("İnceleme başarılı bir şekilde gönderildi!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Server returned an error:", response.status);
        toast.error("İnceleme gönderilirken bir hata oluştu.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("An error occurred while submitting review:", error);
      toast.error("İnceleme gönderilirken bir hata oluştu.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  return (
    <div style={{ backgroundColor: 'gray', padding: '20px', borderRadius: '8px' }}>
      <TextField
        value={text}
        onChange={handleChange}
        placeholder="Enter text here..."
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        sx={{ marginBottom: 2 }}
      />
  
      <Select
        value={rating}
        onChange={handleRatingChange}
        style={{ backgroundColor: 'gray' }}
      >
        {[1, 2, 3, 4, 5].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
  
      <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
        İnceleme Yap
      </Button>
      <div></div>
      <Button variant="contained" onClick={handleFavoriteToggle}>
        {isFavorited ? "Favoriden Kaldır" : "Favorilere Ekle"}
      </Button>
  
      {isFavorited && <span style={{ marginLeft: '10px', color: 'green' }}>Favorilere eklendi!</span>}
  
      <ToastContainer />
    </div>
  );
};

export default TextBox;
