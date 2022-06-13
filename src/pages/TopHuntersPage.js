import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

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
    <Container>
      <Row>
        <h1>CURRENT TOP 5 HUNTERS</h1>
      </Row>
      <Row>
        {topUsers.map((user) => (
          <Col xs={2} md={4} lg={4} className="top5">
            <h2>Hunter: {user.name}</h2>
            <h2>&#9889;</h2>
            <h3>
              <b>Stadiums Hunted: </b>
              {user.huntedStadiums.length}
            </h3>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TopHuntersPage;
