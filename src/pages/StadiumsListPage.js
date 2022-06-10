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

const API_URL = "http://localhost:5005";

function StadiumsListPage() {
  const [stadiums, setStadiums] = useState([]);

  const getAllStadiums = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/stadiums`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setStadiums(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllStadiums();
  }, []);

  return (
    <Container>
      <Row>
        <Col style={{ marginBottom: "10px" }}>
          <h1 className="mb-5 text-center">Let's start the hunting!</h1>
          <form /*onSubmit={handleSubmit}*/>
            <InputGroup>
              <FormControl
                placeholder="Search Stadiums by Name"
                style={{ width: "42vw" }}
                name="text"
                value="aca ira la buqueda" /*onChange={e => handleInput(e)}*/
              />
              <Button type="submit" variant="secondary">
                Search
              </Button>
            </InputGroup>
          </form>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-5">
        {stadiums.map((stadium) => (
          <StadiumCard key={stadium.id} stadium={stadium} />
        ))}
      </Row>
    </Container>
  );
}

export default StadiumsListPage;
