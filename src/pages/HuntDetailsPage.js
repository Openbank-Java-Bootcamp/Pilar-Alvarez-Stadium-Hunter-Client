import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
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
  Form,
} from "react-bootstrap";

const API_URL = "http://localhost:5005";

function HuntDetailsPage() {
  const [huntedStadiums, setHuntedStadiums] = useState([]);
  const [countries, setCountries] = useState([]);
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [toShowStadiums, setToShowStadiums] = useState([]);

  const getHuntedStadiums = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/stadiums`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setHuntedStadiums(response.data);
        setToShowStadiums(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getCountries = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/countries`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setCountries(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getHuntedStadiums();
    getCountries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let filteredStadiums;
    if (search === "") {
      filteredStadiums = huntedStadiums;
    } else {
      filteredStadiums = huntedStadiums.filter((stadium) => {
        return stadium.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    setToShowStadiums(filteredStadiums);
    setSearch("");
    console.log(filteredStadiums);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="hunt-details">
              <h2>STADIUM HUNTER ID</h2>
              <h2>{user.name}</h2>
              <h3>Nº of Hunts: {huntedStadiums.length}</h3>

              <h3>Percentage: </h3>

              <h3>Nº of Countries where you have hunted: {countries.length}</h3>
            </div>
          </Col>
          <Col md="8">
            <MultiMaps huntedStadiums={huntedStadiums} />
          </Col>
        </Row>
        <Row>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="margin-input">
              <FormControl
                placeholder="Search Stadiums by Name"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button type="submit" variant="dark">
                Search
              </Button>
              <> </>
              <Button
                onClick={() => setToShowStadiums(huntedStadiums)}
                variant="outline-dark"
              >
                Refresh
              </Button>
            </InputGroup>
          </Form>
        </Row>
        <Row xs={1} md={4} className="g-5" style={{ marginTop: "20px" }}>
          {toShowStadiums.map((stadium) => (
            <MyStadiumCard
              key={stadium.id}
              stadium={stadium}
              getCountries={getCountries}
              getHuntedStadiums={getHuntedStadiums}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HuntDetailsPage;
