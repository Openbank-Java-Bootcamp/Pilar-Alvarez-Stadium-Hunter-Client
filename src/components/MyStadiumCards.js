import {
  Card,
  Button,
  Col,
  Row,
  InputGroup,
  Container,
  FormControl,
  Form,
  Modal,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5005";

function MyStadiumCard(props) {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteStadium = () => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);
    axios
      .delete(`${API_URL}/api/users/${props.stadium.id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.getHuntedStadiums();
        props.getCountries();
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stadiumId = props.stadium.id;
    const requestBody = { comment, rating, stadiumId };
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);
    axios
      .post(`${API_URL}/api/reviews`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setComment("");
        setRating("");
      })
      .catch((error) => console.log(error));
    handleClose();
  };

  return (
    <Col key={props.stadium.id} className="col-sm-6 col-md-3">
      <Card
        bg="light"
        text="dark"
        border="dark"
        style={{ width: "14rem", minHeight: 370 }}
      >
        <Card.Header>
          <h4>{props.stadium.name}</h4>
        </Card.Header>
        <Card.Body className="cardFlex">
          <>
            <Card.Text>
              <b>City:</b> {props.stadium.city}
            </Card.Text>
            <Card.Text>
              <b>Country:</b> {props.stadium.country}
            </Card.Text>
          </>
          <>
            <Button
              className="margin-btn"
              onClick={deleteStadium}
              variant="danger"
            >
              Delete Stadium
            </Button>

            <Button
              className="margin-btn"
              variant="success"
              onClick={handleShow}
            >
              Add Review
            </Button>

            <Button className="margin-btn" variant="secondary">
              <Link className="plain-link" to={`/stadiums/${props.stadium.id}`}>
                Stadium Details
              </Link>
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Review</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>
                      Let other hunters know your opinion...
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setComment(e.target.value)}
                      as="textarea"
                      rows={3}
                    />
                  </Form.Group>
                  <Form.Select onChange={(e) => setRating(e.target.value)}>
                    <option>Rate this stadium</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Form.Select>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Submit Review
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MyStadiumCard;
