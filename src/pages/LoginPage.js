import React, { useState, useContext } from "react";
import {
  InputGroup,
  Button,
  FormControl,
  Container,
  Form,
} from "react-bootstrap/";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/api/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="anonym-page">
      <Container className="d-flex justify-content-center flex-column align-items-center">
        <h3>Log In</h3>

        <form onSubmit={handleSubmit}>
          <InputGroup style={{ display: "inline-block" }}>
            <FormControl
              style={{ width: "300px", margin: "15px" }}
              placeholder="Email..."
              name="email"
              type="email"
              value={email}
              onChange={(e) => handleEmail(e)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>

            <FormControl
              style={{ width: "300px", margin: "15px" }}
              placeholder="Password..."
              name="password"
              type="password"
              value={password}
              onChange={(e) => handlePassword(e)}
            />

            <Button className="block-button" type="submit" variant="dark">
              Log In
            </Button>
          </InputGroup>
        </form>

        <Link className="plain-link" to={"#"}>
          Forgot password?
        </Link>
        <br />

        <h6>Don't have an account?</h6>

        <Button
          className="block-button"
          as={Link}
          to="/signup"
          type="submit"
          variant="dark"
        >
          Sign Up
        </Button>
      </Container>
    </div>
  );
}

export default Login;
