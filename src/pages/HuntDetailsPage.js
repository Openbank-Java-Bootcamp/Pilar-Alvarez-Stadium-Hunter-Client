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
import Chart from "chart.js/auto";
import MyChart from "../components/MyChart";
import noResult from "../images/detective.png";

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
    <div className="page-background">
      <Container>
        <Row>
          <Col>
            <div className="hunt-details">
              <h2>HUNTER: {user.name}</h2>
              <br />
              <h3>
                Nº of Hunts:{" "}
                <span className="numberBis">{huntedStadiums.length}</span>
              </h3>

              <h5>Out of 1300 stadiums</h5>
              <MyChart hunted={huntedStadiums} />
              <br />
              <div>
                <h5>Nº of Countries</h5>
                <h5> where you have hunted:</h5>
                <h5>
                  <span className="numberBis">{countries.length}</span>
                </h5>
              </div>
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
                variant="dark"
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
          {toShowStadiums.length == 0 && (
            <>
              <div></div>
              <div className="noResults">
                <h4>
                  <b>Oops! No results found.</b>
                </h4>
                <img width={300} src={noResult} alt="no-results" />
              </div>
              <div></div>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default HuntDetailsPage;
