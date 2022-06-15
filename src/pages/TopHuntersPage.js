import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import UserCard from "../components/UserCard";
import fireworks from "../images/fireworks.mp4";

const API_URL = "http://localhost:5005";

function TopHuntersPage() {
  const [topUsers, setTopUsers] = useState([]);

  const getTopUsers = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/count`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setTopUsers(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTopUsers();
  }, []);

  return (
    <div className="main">
      <video src={fireworks} loop autoPlay muted />
      <div className="over-top">
        <Container>
          <Row className="black-text">
            <h2>JUST TO KEEP YOU MOTIVATED</h2>
            <h4>Our current 5 top hunters:</h4>
          </Row>
          <div className="space-top">
            <Row>
              {topUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default TopHuntersPage;
