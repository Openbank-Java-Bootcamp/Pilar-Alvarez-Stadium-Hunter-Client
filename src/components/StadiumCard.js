import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5005";

function StadiumCard(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  const huntStadium = () => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);
    axios
      .patch(
        `${API_URL}/api/users/${props.stadium.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        props.getRemainStadiums();
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Col key={props.stadium.id} className="col-sm-6 col-md-4 ">
      <Card
        style={{ width: "14rem", minHeight: 270 }}
        border="secondary"
        className="shadow-card"
      >
        <Card.Body className="cardFlex">
          <div>
            <Card.Title>{props.stadium.name.toUpperCase()}</Card.Title>
            <Card.Text>
              <b>City:</b> {props.stadium.city}
            </Card.Text>
            <Card.Text>
              <b>Country:</b> {props.stadium.country}
            </Card.Text>
          </div>
          <div>
            <Button className="margin-btn" variant="secondary">
              <Link className="plain-link" to={`/stadiums/${props.stadium.id}`}>
                Stadium Details
              </Link>
            </Button>
            <Button
              className="margin-btn"
              onClick={huntStadium}
              variant="success"
            >
              Hunt Stadium!
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default StadiumCard;
