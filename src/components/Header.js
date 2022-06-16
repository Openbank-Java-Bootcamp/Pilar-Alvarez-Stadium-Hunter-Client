import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap/";
import Logo from "../images/LOGITO.png";
import { logDOM } from "@testing-library/react";

function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ marginBottom: "30px", zIndex: "5" }}
    >
      <Container fluid style={{ height: "45px" }}>
        <Navbar.Brand
          style={{ marginTop: "0px", marginRight: "4rem", padding: "0px" }}
          as={Link}
          to="/"
        >
          <div className="logo">
            <img src={Logo} width={170} />
          </div>
          {/* <span>StadiumHunters</span> */}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{
            //backgroundColor: "#805d93",
            padding: "5px",
            borderRadius: "10px",
            justifyContent: "flex-end",
          }}
        >
          {isLoggedIn ? (
            <>
              <Nav id="responsive-navbar-nav" className="me-auto">
                <Nav.Link as={Link} to="/stadiums">
                  <Button variant="light" className="greyBtn" size="sm">
                    Hunt Stadiums
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/myHunt">
                  <Button variant="light" className="greyBtn" size="sm">
                    My Hunts
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/topHunters">
                  <Button variant="light" className="greyBtn" size="sm">
                    TopHunters
                  </Button>
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link style={{ marginRight: "3rem" }} as={Link} to="#">
                  Logged as: Hunter {user.name} &#128521;
                </Nav.Link>
              </Nav>

              <Nav>
                {/* <NavDropdown title="Profile" align="end">
                  <NavDropdown.Item as={Link} to="#">
                    Alguna pag
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#">
                    Otra parte
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="#">
                    MOtra pag
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOutUser}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Link
                  style={{ marginRight: "3rem" }}
                  as={Link}
                  onClick={logOutUser}
                  to="#"
                >
                  Log Out
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/login">
                  Log In
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
