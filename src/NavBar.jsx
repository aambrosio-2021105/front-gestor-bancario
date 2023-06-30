import { isUserLogged } from "./login/helpers/isUserAuthenticated";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import banco from "./img/Logo_G&T.png";
import { Link } from "react-router-dom";

export const NavBar = () => {

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
Link

  return (
    <>
      {isUserLogged() && (
        <Navbar bg="light" expand="lg">
          <Container>
            <Link to='/home'>
              <Image style={{ width: "55%" }} src={banco} fluid />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link className="mx-4" href="#link">
                  Panel
                </Nav.Link>
                <Nav.Link to="/tranccioness" className="mx-4">
                  Movimientos
                </Nav.Link>
                <Nav.Link className="mx-4" href="#link">
                  Enviar
                </Nav.Link>

                <NavDropdown title="Ayuda" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user fa-fw"></i>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                      <Link className="dropdown-item" to='/perfil'>
                          Mi Perfil
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={logOut}>
                          Cerrar Sesion
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};
