import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Row,
  InputGroup,
  Container,
  FormControl,
  Form,
  Spinner,
} from "react-bootstrap";
import StadiumCard from "../components/StadiumCard";

const API_URL = "http://localhost:5005";

function StadiumsListPage() {
  const [stadiums, setStadiums] = useState([]);
  const [huntedStadiums, setHuntedStadiums] = useState([]);
  const [remainStadiums, setRemainStadiums] = useState([]);
  const [toShowStadiums, setToShowStadiums] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [isLoaded, setIsLoaded] = useState(false);

  const sortStadiums = (arr) => {
    const sortArr = [...arr].sort((a, b) => b.capacity - a.capacity);
    setStadiums(sortArr);
    // setToShowStadiums(stadiums);
  };

  const getAllStadiums = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/stadiums`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        sortStadiums(response.data);
        console.log("test1");
      })
      .catch((error) => console.log(error));
  };

  const getHuntedStadiums = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/stadiums`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setHuntedStadiums(response.data);
        setIsLoaded(true);
        console.log("test2");
      })
      .catch((error) => console.log(error));
  };

  const removeHuntedStadiums = () => {
    const toShow = stadiums.filter(
      (st) => !huntedStadiums.find((hs) => hs.id === st.id)
    );

    console.log("test");
    setIsLoaded(false);
    setRemainStadiums(toShow);
    setToShowStadiums(toShow);
  };

  useEffect(() => {
    getAllStadiums();
    getHuntedStadiums();
  }, []);

  useEffect(() => {
    // if (isLoaded) {
    //   console.log(isLoaded);
    removeHuntedStadiums();
    // }
  }, [isLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let filteredStadiums;
    if (searchType === "name") {
      if (search === "") {
        filteredStadiums = remainStadiums;
      } else {
        filteredStadiums = remainStadiums.filter((stadium) => {
          return stadium.name.toLowerCase().includes(search.toLowerCase());
        });
      }
    } else if (searchType === "country") {
      if (search === "") {
        filteredStadiums = remainStadiums;
      } else {
        filteredStadiums = remainStadiums.filter((stadium) => {
          return stadium.country.toLowerCase().includes(search.toLowerCase());
        });
      }
    }
    setToShowStadiums(filteredStadiums);
    setSearch("");
  };

  const refresh = () => {
    setToShowStadiums(remainStadiums);
    setSearch("");
  };

  // console.log(stadiums);
  // console.log(huntedStadiums);
  // console.log(remainStadiums);
  // console.log(toShowStadiums);

  return (
    <Container>
      <Row>
        <Col style={{ marginBottom: "10px" }}>
          <h1 className="mb-5 text-center">Let's start the hunting!</h1>
          <Button className="margin1" variant="dark">
            <Link className="button-link" to={`/myHunt`}>
              <b>My Hunting Collection</b>
            </Link>
          </Button>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <FormControl
                placeholder="Search Stadiums (default by name)..."
                style={{ width: "42vw" }}
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit" variant="dark">
                Search
              </Button>
              <> </>
              <Button onClick={() => refresh()} variant="outline-dark">
                Refresh
              </Button>
            </InputGroup>
          </form>
          <Form.Check
            inline
            label="Search By Name"
            name="group1"
            type="radio"
            id={`inline-radio-1`}
            value={"name"}
            onClick={(e) => setSearchType(e.target.value)}
          />
          <Form.Check
            inline
            label="Search By Country"
            name="group1"
            type="radio"
            value={"country"}
            id={`inline-radio-2`}
            onClick={(e) => setSearchType(e.target.value)}
          />
        </Col>
      </Row>
      {toShowStadiums == [] && (
        <Row>
          <div className="loading">
            <Spinner animation="border" variant="dark" />
            <p>Please Wait...</p>
            <p>This may take a few minutes</p>
          </div>
        </Row>
      )}
      <Row xs={2} md={3} lg={4} className="g-5">
        {toShowStadiums.map((stadium) => (
          <StadiumCard
            key={stadium.id}
            stadium={stadium}
            getHuntedStadiums={getHuntedStadiums}
            removeHuntedStadiums={removeHuntedStadiums}
            huntedStadiums={huntedStadiums}
          />
        ))}
      </Row>
    </Container>
  );
}

export default StadiumsListPage;
