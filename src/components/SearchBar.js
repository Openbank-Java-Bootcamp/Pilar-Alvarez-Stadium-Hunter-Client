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

function SearchBar(props) {
  const [text, setText] = useState("");

  const handleSearch = (e, text, searchType) => {
    setText(e.target.value);
    props.filterStadiums(text);
  };

  return (
    <>
      <Form>
        <InputGroup>
          <FormControl
            placeholder="Search Stadiums"
            style={{ width: "42vw" }}
            name="text"
            value={text}
            onChange={(e) => handleSearch(e)}
          />
        </InputGroup>
      </Form>
    </>
  );
}

export default SearchBar;
