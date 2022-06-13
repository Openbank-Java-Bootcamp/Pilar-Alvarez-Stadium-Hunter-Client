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

function MyStadiumCard(props) {
  const deleteStadium = () => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);
    axios
      .delete(`${API_URL}/api/users/${props.stadium.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .catch((error) => console.log(error));
  };

  return (
    <Col key={props.stadium.id} className="col-sm-6 col-md-3">
      <Card bg="light" text="dark" border="dark">
        <Card.Header>
          <h4>{props.stadium.name}</h4>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <b>City:</b> {props.stadium.city}
          </Card.Text>
          <Card.Text>
            <b>Country:</b> {props.stadium.country}
          </Card.Text>
          <Button onClick={deleteStadium} variant="danger">
            Delete Stadium
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MyStadiumCard;
