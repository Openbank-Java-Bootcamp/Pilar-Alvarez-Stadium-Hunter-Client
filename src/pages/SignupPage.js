import {
  InputGroup,
  Button,
  Form,
  FormControl,
  Container,
} from "react-bootstrap/";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };
    console.log(requestBody);
    axios
      .post(`${API_URL}/api/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="anonym-page">
      <Container className="d-flex justify-content-center flex-column align-items-center">
        <h3>Sign Up</h3>

        <form onSubmit={handleSignupSubmit}>
          <InputGroup style={{ display: "inline-block" }}>
            <FormControl
              style={{ width: "300px", margin: "15px" }}
              placeholder="E-mail..."
              name="email"
              type="text"
              value={email}
              onChange={(e) => handleEmail(e)}
            />

            <FormControl
              style={{ width: "300px", margin: "15px" }}
              placeholder="Name..."
              name="name"
              type="text"
              value={name}
              onChange={(e) => handleName(e)}
            />

            <FormControl
              style={{ width: "300px", margin: "15px" }}
              placeholder="Password..."
              name="password"
              type="password"
              value={password}
              onChange={(e) => handlePassword(e)}
            />

            <Button className="block-button" type="submit" variant="dark">
              Sign Up
            </Button>
          </InputGroup>
        </form>

        <h6>Already have an account?</h6>

        <Button
          className="block-button"
          as={Link}
          to="/login"
          type="submit"
          variant="dark"
        >
          Log In
        </Button>
      </Container>
    </div>
  );
}

export default Signup;
