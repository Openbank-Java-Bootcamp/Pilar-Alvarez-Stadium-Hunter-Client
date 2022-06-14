import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row, Card } from "react-bootstrap";
import MyMap from "../components/IndividualMap";
import StarRatings from "react-star-ratings";

const API_URL = "http://localhost:5005";

function StadiumDetailPage() {
  const [reviews, setReviews] = useState([]);
  const [stadium, setStadium] = useState([]);
  const [rating, setRating] = useState(0);
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

  const getRating = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/reviews/avg/${stadiumId}`, {
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
              <h4>Stadium Reviews</h4>
              <Col
                style={{
                  overflow: "scroll",
                  height: "160px",
                }}
              >
                {reviews.map((rev) => {
                  return (
                    <div key={rev.id} className="comment-border">
                      <h5>Hunter: {rev.user.name}</h5>
                      <h6>
                        <em>"{rev.comment}"</em>
                      </h6>
                    </div>
                  );
                })}
              </Col>
            </Row>
          </Container>
        </Col>
        <Col>
          <MyMap stadium={stadium} />
        </Col>
      </Row>
    </Container>
  );
}

export default StadiumDetailPage;
