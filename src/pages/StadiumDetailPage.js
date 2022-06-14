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
        <Row>
          <Col>
            <Card style={{ width: "35rem" }}>
              <Card.Body>
                <Card.Title>{stadium.name}</Card.Title>
                <Card.Text>City: {stadium.city}</Card.Text>
                <Card.Text>Country: {stadium.country}</Card.Text>
                <Card.Text>Capacity: {stadium.capacity}</Card.Text>
                <Card.Text>Rating: {rating}</Card.Text>
                <StarRatings
                  rating={rating}
                  starRatedColor="blue"
                  numberOfStars={5}
                  name="rating"
                />
              </Card.Body>
            </Card>
            <Container>
              <Row style={{ marginTop: "30px" }}>
                {/* <h4>Stadium Reviews</h4> */}
                <Col>
                  <MyCarousel reviews={reviews} />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col>
            <MyMap stadium={stadium} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StadiumDetailPage;
