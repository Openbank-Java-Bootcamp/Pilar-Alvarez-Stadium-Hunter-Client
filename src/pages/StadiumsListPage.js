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
import football from "../images/football-no-background.png";
import noResult from "../images/detective.png";

const API_URL = "http://localhost:5005";

function StadiumsListPage() {
  const [remainStadiums, setRemainStadiums] = useState([]);
  const [toShowStadiums, setToShowStadiums] = useState([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [isLoaded, setIsLoaded] = useState(false);

  const sortStadiums = (arr) => {
    const sortArr = [...arr].sort((a, b) => b.capacity - a.capacity);
    setRemainStadiums(sortArr);
  };

  const getRemainStadiums = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/remainingStadiums`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        sortStadiums(response.data);
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRemainStadiums();
  }, []);

  useEffect(() => {
    setToShowStadiums(remainStadiums);
  }, [remainStadiums]);

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

  return (
    <div className="page-background">
      <Container>
        <Row>
          <Col style={{ marginBottom: "10px" }}>
            <h1 className=" mb-5 text-center">LET'S START THE HUNTING!</h1>
            <marquee behavior="alternate" scrollamount="40">
              <marquee behavior="alternate" direction="down" scrollamount="30">
                <img src={football} class="ball" />
              </marquee>
            </marquee>
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
                <Button onClick={() => refresh()} variant="dark">
                  Refresh
                </Button>
              </InputGroup>
            </form>
            <div className="form-top-mg">
              <b>
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
              </b>
            </div>
          </Col>
        </Row>
        {!isLoaded && (
          <div className="charging">
            <Row>
              <div className="loading">
                <Spinner animation="border" variant="dark" />
                <p>Please Wait...</p>
                <p>This may take a few minutes</p>
              </div>
            </Row>
          </div>
        )}
        <Row xs={2} md={3} lg={4} className="g-5">
          {toShowStadiums.map((stadium) => (
            <StadiumCard
              key={stadium.id}
              stadium={stadium}
              getRemainStadiums={getRemainStadiums}
            />
          ))}

          {toShowStadiums.length == 0 && isLoaded && (
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

export default StadiumsListPage;
