import { Button, Col, Row, Container } from "react-bootstrap";
import stadiumVideo from "../images/stadium-video.mp4";
import { Link } from "react-router-dom";
import React from "react";

const API_URL = "http://localhost:5005";

function HomePage() {
  return (
    <div className="main">
      <video src={stadiumVideo} loop autoPlay muted />
      <div className="over">
        <div className="button-hp">
          <div>
            <Button variant="danger" size="lg">
              <Link className="button-link" to="/stadiums">
                <b>START THE HUNT!</b>
              </Link>
            </Button>
          </div>
        </div>
        <div className="home-page-text">
          <b>
            <h1>The Nº1 App for serial football stadium hunters.</h1>
            <h3>Keep track of all the stadiums you have visited.</h3>
          </b>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
