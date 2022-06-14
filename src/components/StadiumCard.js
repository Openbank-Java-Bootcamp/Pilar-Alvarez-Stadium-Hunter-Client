import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5005";

function StadiumCard(props) {
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
        props.getHuntedStadiums();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Col key={props.stadium.id} className="col-sm-6 col-md-4 ">
      <Card
        style={{ width: "14rem" }}
        border="secondary"
        className="shadow-card"
      >
        <Card.Body>
          <Card.Title>{props.stadium.name.toUpperCase()}</Card.Title>
          <Card.Text>
            <b>City:</b> {props.stadium.city}
          </Card.Text>
          <Card.Text>
            <b>Country:</b> {props.stadium.country}
          </Card.Text>
          <>
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
          </>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default StadiumCard;
