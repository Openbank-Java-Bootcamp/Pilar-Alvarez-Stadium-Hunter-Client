import stadiumsData from "../stadiums-data.json";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  InputGroup,
  Container,
  FormControl,
} from "react-bootstrap";
import Stadium from "../images/stadium-icon.jpg";
import StadiumCard from "../components/StadiumCard";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function HomePage() {
  return (
    <div className="homePageHunters">
      <Container>
        <Row>
          <Col>
            <h1>The Nº1 App for serial football stadium hunters.</h1>
            <h3>Keep track of each stadium you have visited.</h3>
            <Button variant="dark">
              <Link className="button-link" to="/stadiums">
                START THE HUNT!
              </Link>
            </Button>
          </Col>
          <Col className="padTop">
            <Button variant="dark">
              <Link className="button-link" to={"/topHunters"}>
                GET INSPIRED BY OTHER HUNTERS!!
              </Link>
            </Button>
            <h3>Meet the most experienced hunters.</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
