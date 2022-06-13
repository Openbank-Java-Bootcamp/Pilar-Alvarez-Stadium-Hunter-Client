import stadiumsData from "../stadiums-data.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Col,
  Row,
  InputGroup,
  Container,
  FormControl,
} from "react-bootstrap";
import StadiumCard from "../components/StadiumCard";
import SearchBar from "../components/SearchBar";

const API_URL = "http://localhost:5005";

function StadiumsListPage() {
  const [stadiums, setStadiums] = useState([]);
  const [huntedStadiums, setHuntedStadiums] = useState([]);
  const [toShowStadiums, setToShowStadiums] = useState([]);
  const [showFilterStadiums, setShowFilterStadiums] = useState([
    toShowStadiums,
  ]);

  const getHuntedStadiums = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/stadiums`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setHuntedStadiums(response.data))
      .catch((error) => console.log(error));
  };

  const sortStadiums = (arr) => {
    const sortArr = [...arr].sort((a, b) => b.capacity - a.capacity);
    setStadiums(sortArr);
  };

  const getAllStadiums = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/stadiums`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        sortStadiums(response.data);
      })
      .catch((error) => console.log(error));
  };

  const removeHunted = (huntedStadiums, stadiums) => {
    const toShow = stadiums.filter(
      (st) => !huntedStadiums.find((hs) => hs.id === st.id)
    );
    setToShowStadiums(toShow);
  };

  useEffect(() => {
    getAllStadiums();
    getHuntedStadiums();
    removeHunted(huntedStadiums, stadiums);
  }, [stadiums]);

  /*   const filterStadiums = (text, searchType) => {
    let filteredStadiums;
    if (text === "") {
      filteredStadiums = toShowStadiums;
    } else {
      filteredStadiums = toShowStadiums.filter((stadium) => {
        return stadium.name.toLowerCase().includes(text.toLowerCase());
      });
    }
    setShowFilterStadiums(filteredStadiums);
  }; */

  return (
    <Container>
      <Row>
        <Col style={{ marginBottom: "10px" }}>
          <h1 className="mb-5 text-center">Let's start the hunting!</h1>
          <Button className="margin1" variant="dark">
            <Link className="button-link" to={`/myHunt`}>
              Go to <b>My Hunting Room</b>
            </Link>
          </Button>
          {/* <SearchBar filterStadiums={filterStadiums} /> */}
          <form /*onSubmit={handleSubmit}*/>
            <InputGroup>
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
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className="g-5">
        {toShowStadiums.map((stadium) => (
          <StadiumCard
            key={stadium.id}
            stadium={stadium}
            getHuntedStadiums={getHuntedStadiums}
          />
        ))}
      </Row>
    </Container>
  );
}

export default StadiumsListPage;
