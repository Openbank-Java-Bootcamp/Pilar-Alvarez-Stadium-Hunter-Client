import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap/";
import { BsTrophyFill } from "react-icons/bs";

function Header() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar
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
          <span>StadiumHunters</span>
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
                <Nav.Link as={Link} to="#">
                  Nav 1
                </Nav.Link>
                <Nav.Link as={Link} to="#">
                  Nav 2
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link style={{ marginRight: "3rem" }} as={Link} to="#">
                  Hunter {user.name} &#9825;{" "}
                </Nav.Link>
              </Nav>

              <Nav>
                <NavDropdown title="Profile" align="end">
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
                </NavDropdown>
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
