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

  console.log(stadiumsData[0].Latitude);
  console.log(typeof stadiumsData[0].Latitude);

  /*   const filteredData = stadiumsData.filter((stad) => {
    const cap = parseInt(stad.Capacity.replace(".", ""));
    if (cap >= 5000) return stad;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const capa = parseInt(a.Capacity.replace(".", ""));
    const capb = parseInt(b.Capacity.replace(".", ""));
    return capb - capa;
  });

  const uniqueData = sortedData.filter(
    (stadium, index, array) =>
      array.findIndex(
        (st) => st.name == stadium.name && st.city == stadium.city
      ) == index
  );

  const saveStadiums = () => {
    const storedToken = localStorage.getItem("authToken");
    sortedData.map((stadium) => {
      const id = stadium.Id;
      const name = stadium.Name;
      const city = stadium.Town;
      const country = stadium.Nation;
      const lat = stadium.Latitude;
      const long = stadium.Longitude;
      const capacity = parseInt(stadium.Capacity.replace(".", ""));
      const requestBody = { id, name, city, country, capacity, lat, long };
      axios
        .post(`${API_URL}/api/stadiums`, requestBody, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .catch((error) => console.log(error));
    });
  };*/

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
    //saveStadiums();
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
