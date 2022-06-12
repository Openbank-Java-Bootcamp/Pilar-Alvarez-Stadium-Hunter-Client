import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import StadiumCard from "../components/StadiumCard";

const API_URL = "http://localhost:5005";

function StadiumDetailPage() {
  const [reviews, setReviews] = useState([]);
  const [stadium, setStadium] = useState([]);
  const { stadiumId } = useParams();

  const getReviews = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/reviews/${stadiumId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setReviews(response.data))
      .catch((error) => console.log(error));
  };

  const getStadium = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/stadiums/${stadiumId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setStadium(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getReviews();
    getStadium();
  }, []);

  return (
    <>
      <h1>Como mierda muestro los review??</h1>
      {reviews.map((rev, index) => (
        <p key={index}>"{rev}"</p>
      ))}
      <StadiumCard key={stadium.id} stadium={stadium} />
    </>
  );
}

export default StadiumDetailPage;
