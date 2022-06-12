import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  InputGroup,
  Container,
  FormControl,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SearchBar(props) {
  const [searchType, setSearchType] = useState("name");
  const [text, setText] = useState("");
  const clearState = () => {
    setText("");
  };
  const handleInput = (e) => {
    setText(e.target.value);
  };

  var path = null;
  const handleSubmit = (e) => {
    e.preventDefault();
    text
      ? (path = `${API_URL}/api/stadiums/${searchType}/${text}`)
      : (path = `${API_URL}/api/stadiums`);
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);
    axios
      .get(path, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => props.setSearchStadiums(response.data))
      .catch((error) => console.log(error));

    clearState();
  };

  const handleRadioClick = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <>
      <Col style={{ marginBottom: "10px" }}>
        <h1 className="mb-5 text-center">Let's start the hunting!</h1>
        <Button variant="primary">
          <Link className="plain-link" to={`/myHunt`}>
            My Hunt Details
          </Link>
        </Button>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <FormControl
              placeholder="Search Stadiums"
              style={{ width: "42vw" }}
              name="text"
              value={text}
              onChange={(e) => handleInput(e)}
            />
            <Button type="submit" variant="secondary">
              Search
            </Button>
          </InputGroup>
        </form>
        <Form className="mt-2 mb-5">
          <Form.Check
            inline
            label="Search By Country"
            name="group1"
            type="radio"
            id={`inline-radio-1`}
            value={"country"}
            onClick={(e) => handleRadioClick(e)}
          />
          <Form.Check
            inline
            label="Search By Name"
            name="group1"
            type="radio"
            value={"name"}
            id={`inline-radio-2`}
            onClick={(e) => handleRadioClick(e)}
          />
        </Form>
      </Col>
    </>
  );
}

export default SearchBar;
