import { useState, useEffect } from "react";

import axios from "axios";
import MyStadiumCard from "../components/MyStadiumCards";
import MultiMaps from "../components/MultipleMap";
import {
  Button,
  Col,
  Row,
  InputGroup,
  Container,
  FormControl,
} from "react-bootstrap";

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
  }, [huntedStadiums]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h2>Your Hunt Details</h2>
            <h3>Stadiums visited: {huntedStadiums.length}</h3>

            <h3>Percentage: </h3>

            <h3>You've hunted stadiums in xx different countries</h3>
          </Col>
          <Col md="8">
            <MultiMaps huntedStadiums={huntedStadiums} />
          </Col>
        </Row>
        <Row>
          <form /*onSubmit={handleSubmit}*/>
            <InputGroup className="margin-input">
              <FormControl
                placeholder="Search Stadiums by Name"
                style={{ width: "42vw" }}
                name="text"
                //value="la verga no funciona"
                //onChange={(e) => handleInput(e)}
              />
              <Button type="submit" variant="dark">
                Search
              </Button>
            </InputGroup>
          </form>
        </Row>
        <Row xs={1} md={4} className="g-5" style={{ marginTop: "20px" }}>
          {huntedStadiums.map((stadium) => (
            <MyStadiumCard key={stadium.id} stadium={stadium} />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HuntDetailsPage;
