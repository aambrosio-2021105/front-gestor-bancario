import { useState } from "react";
import { apiLogin } from "../api/apiLogin";
import Swal from "sweetalert2";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import banco from "../../img/Logo_G&T.png";

export const Login = () => {
  //Manejo del state del email y del password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const navigate = useNavigate(); // create a navigate function

  const handleSubmit = async (event) => {
    event.preventDefault(); //Para que la pagina no se recarge
    console.log(password);
    const result = await apiLogin(username, password);
    if (result) {
      Swal.fire({
        icon: "success",
        title: "Los datos ingresados son correctos",
        text: "Ha iniciado sesion correctamente",
        confirmButtonText: "Ok",
      }).then((r) => {
        if (r.isConfirmed) {
          const [header, payload, signature] = result.split('.');
          const decodedPayload = JSON.parse(atob(payload));
          const userRole = decodedPayload.rol;
          console.log(userRole);
          if (userRole == "ADMIN_APP") {
            window.location.href = "/panel-adminapp";
          } else {
            window.location.href = "/home";
          }
        }
      });
    }
  };

  return (
    <>
      <Navbar bg='light' expand="lg">
        <Container>
          <Image style={{ width: '15%' }} src={banco} fluid />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="mx-4" href="#link">Personas</Nav.Link>
              <Nav.Link className="mx-4" href="#link">Empresas</Nav.Link>
              <Nav.Link className="mx-4" href="#link">Somos GTC</Nav.Link>
              <Nav.Link className="mx-4" href="#link">Corporativo</Nav.Link>
              <NavDropdown title="Ayuda" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">

            <div className="col-md-6 d-none d-md-flex bg-image"></div>

            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">

                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <h3 className="display-4">Bienvenido</h3>
                      <p className="text-muted mb-4">Por favor, ingresa tus datos para iniciar sesión.</p>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <input type="text" placeholder="Usuario" id="email" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control rounded-pill border-0 shadow-sm px-4" required />
                        </div>
                        <div className="mb-3">
                          <input id="password" type="password" placeholder="Contraseña" required className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" value={password} onChange={(p) => setPassword(p.target.value)} />
                        </div>
                        <div className="form-check">
                          <input id="customCheck1" type="checkbox" checked className="form-check-input" value={password} onChange={(p) => setPassword(p.target.value)} />
                          <label className="form-check-label">Recordar mi contraseña</label>
                        </div>
                        <div className="d-grid gap-2 mt-2">
                          <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2  shadow-sm">Ingresar</button>
                        </div>

                        <div className="text-center d-flex justify-content-between mt-4"><a href="#" className="font-italic text-muted"> ¿Olvidaste tu contraseña?</a>
                        </div>
                        <p className=" text-center text-muted mt-5">HECHO CON FINES EDUCATIVOS.</p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
