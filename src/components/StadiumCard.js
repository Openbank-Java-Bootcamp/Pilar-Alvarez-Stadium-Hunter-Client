import Stadium from "../images/stadium-icon.jpg";
import {
  Card,
  Button,
  Col,
  Row,
  InputGroup,
  Container,
  FormControl,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function StadiumCard(props) {
  const { stadiumId } = useParams();

  const huntStadium = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .patch(`${API_URL}/api/users/${stadiumId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .catch((error) => console.log(error));
  };

  return (
    <Col key={props.stadium.id} className="col-sm-6 col-md-4">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={Stadium} />
        <Card.Body>
          <Card.Title>{props.stadium.name}</Card.Title>
          <Card.Text>City: {props.stadium.city}</Card.Text>
          <Card.Text>Country: {props.stadium.country}</Card.Text>
          <>
            <Button variant="primary">
              <Link className="plain-link" to="/stadiums/{stadiumId}">
                Stadium Details
              </Link>
            </Button>
            <Button onClick={huntStadium} variant="success">
              Stadium Hunted!
            </Button>
          </>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default StadiumCard;
