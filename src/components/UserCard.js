import { Card, Button, Col } from "react-bootstrap";
import gold from "../images/medalla.png";

function UserCard(props) {
  return (
    <div className="sideMargins">
      <Card
        style={{ width: "16rem" }}
        border="secondary"
        className="shadow-card"
      >
        <Card.Body>
          <Card.Title className="goldHunter">GOLD HUNTER</Card.Title>

          <Card.Text>
            <img src={gold} style={{ width: 50 }} />
          </Card.Text>
          <Card.Text>
            <b> {props.user.name.toUpperCase()}</b>
          </Card.Text>
          <Card.Text>
            <b>Nº of Hunts:</b>{" "}
            <span className="number">{props.user.huntedStadiums.length}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserCard;
