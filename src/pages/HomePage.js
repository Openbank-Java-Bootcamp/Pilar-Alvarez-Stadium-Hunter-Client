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
    <div>
      <h1>Home Page</h1>
      <Button variant="outline-primary">
        <Link to="/stadiums">Start the hunt!</Link>
      </Button>
    </div>
  );
}

export default HomePage;
