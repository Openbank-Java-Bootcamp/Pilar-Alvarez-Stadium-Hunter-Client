import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import StadiumCard from "../components/StadiumCard";
import HuntPieChart from "../components/HuntPieChart";

const API_URL = "http://localhost:5005";

function HuntDetailsPage() {
  const [huntedStadiums, setHuntedStadiums] = useState([]);

  const getHuntedStadiums = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/stadiums`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setHuntedStadiums(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getHuntedStadiums();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <HuntPieChart />
          <p>Stadiusm visited: {huntedStadiums.length}</p>
        </Row>
        <Row xs={1} md={3} className="g-5">
          {huntedStadiums.map((stadium) => (
            <StadiumCard key={stadium.id} stadium={stadium} />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HuntDetailsPage;
