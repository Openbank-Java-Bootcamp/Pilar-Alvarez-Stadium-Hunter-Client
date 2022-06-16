import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row, Card, Button, Modal } from "react-bootstrap";
import MyMap from "../components/IndividualMap";
import StarRatings from "react-star-ratings";
import MyCarousel from "../components/MyCarousel";

const API_URL = "http://localhost:5005";

function StadiumDetailPage() {
  const [reviews, setReviews] = useState([]);
  const [stadium, setStadium] = useState([]);
  const [rating, setRating] = useState(0);
  const { stadiumId } = useParams();
  const [show, setShow] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  console.log(rating);

  const getRating = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/review/avg/${stadiumId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRating(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getReviews();
    getStadium();
    getRating();
  }, []);

  return (
    <div className="page-background">
      <Container>
        <div className="stadiumDetails">
          <div className="properties">
            <h1>{stadium.name}</h1>
            <h5>
              <span className="etiquetas">City:</span> {stadium.city}
            </h5>
            <h5>
              <span className="etiquetas">Country:</span> {stadium.country}
            </h5>
            <h5>
              <span className="etiquetas">Capacity:</span> {stadium.capacity}
            </h5>
            <h3 className="rating">Rating: {rating}</h3>
            <StarRatings
              rating={rating}
              starRatedColor="red"
              numberOfStars={5}
              name="rating"
            />
          </div>
          <div>
            {/* <h4>Stadium Reviews</h4> */}

            <MyCarousel reviews={reviews} />
          </div>
          <Button
            variant="danger"
            onClick={() => setShowLocation(!showLocation)}
          >
            {showLocation ? (
              <>HIDE STADIUM LOCATION &#128205;</>
            ) : (
              <>SHOW STADIUM LOCATION &#128205;</>
            )}
          </Button>
          <div>{showLocation && <MyMap stadium={stadium} />}</div>
        </div>
      </Container>
    </div>
  );
}

export default StadiumDetailPage;
