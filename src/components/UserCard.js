import { Card, Button, Col } from "react-bootstrap";
import gold from "../images/medalla.png";

function UserCard(props) {
  return (
    <Col className="col-sm-6 col-md-4 ">
      <Card
        style={{ width: "16rem" }}
        border="secondary"
        className="shadow-card"
      >
        <Card.Body>
          <Card.Title>GOLD HUNTER</Card.Title>

          <Card.Text>
            <img src={gold} style={{ width: 50 }} />
          </Card.Text>
          <Card.Text>
            <b> {props.user.name.toUpperCase()}</b>
          </Card.Text>
          <Card.Text>
            <b>Nº of Hunts:</b> {props.user.huntedStadiums.length}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default UserCard;
