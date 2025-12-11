import { Container, Navbar, Nav, NavDropdown, Row, Col, Button, Form } from "react-bootstrap";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useSession } from "../hooks/useSession";

import { ROUTE_PARAMS, ROUTE_PATHS } from "../utils/constants";

import { useState } from "react";

import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";




function Layout() {

 const navigate = useNavigate();

 const [query, setQuery] = useState("");

 const { isLogged, userSession, signOut } = useSession();



 const searchQuery = () => {

  navigate(`${ROUTE_PATHS.HOME}?${ROUTE_PARAMS.SEARCH}=${query}`);

 };



 return (

  <>

   {/* Navbar bonito con gradiente rosa pastel */}

   <header>

    <Navbar expand="lg" style={{ 

     background: "linear-gradient(90deg, #FFD1DC 0%, #FBCFE8 100%)", 

     boxShadow: "0 4px 10px rgba(0,0,0,0.1)" 

    }} variant="light">

     <Container>

      <Navbar.Brand

       as={NavLink}

       to={ROUTE_PATHS.HOME}

       style={{ fontFamily: "'Pacifico', cursive", fontSize: "1.8rem", color: "#9f3c5dff" }}

      >

       Momo&Virgo Sabores Fantasma

      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">

       <Nav className="me-auto justify-content-end align-items-center">

        <Row className="g-2 align-items-center">

         <Col xs="auto">

          <Form.Control

           type="text"

           placeholder="Buscar..."

           value={query}

           onChange={(e) => setQuery(e.target.value)}

           style={{ borderRadius: "25px", border: "1px solid #F2C1D1" }}

          />

         </Col>

         <Col xs="auto">

          <Button

           onClick={searchQuery}

           style={{

            backgroundColor: "#D57A9B",

            border: "none",

            borderRadius: "25px",

            color: "white",

            fontWeight: "600",

            boxShadow: "0 3px 6px rgba(0,0,0,0.1)"

           }}

          >

           Buscar

          </Button>

         </Col>

        </Row>



        {isLogged ? (

         <NavDropdown 

          title={userSession.username}

          id="basic-nav-dropdown"

          style={{ marginLeft: "15px" }}

         >

          {/* Nuevo enlace a la página de perfil del usuario */}
          <NavDropdown.Item as={NavLink} to="/profile">Mi perfil</NavDropdown.Item>

          {userSession.isAdmin && (

           <NavDropdown.Item as={NavLink} to="/admin">

             Panel Admin

           </NavDropdown.Item>

          )}

          <NavDropdown.Divider />

          <NavDropdown.Item onClick={signOut}>Cerrar sesión</NavDropdown.Item>

         </NavDropdown>

        ) : (

         <Nav.Link 

          as={NavLink} 

          to={ROUTE_PATHS.SIGN_IN} 

          style={{ marginLeft: "15px", fontWeight: "600", color: "#9f3c5dff" }}

         >

          Iniciar sesión

         </Nav.Link>

        )}



       </Nav>

      </Navbar.Collapse>

     </Container>

    </Navbar>

   </header>



   <Container className="my-4">

    <Outlet />

   </Container>



   {/* Footer bonito */}

   <footer
  style={{
    background: "linear-gradient(90deg, #FFD1DC 0%, #FBCFE8 100%)",
    color: "#9f3c5dff",
    textAlign: "center",
    padding: "15px 0",
    marginTop: "auto",
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px" // espacio entre texto e íconos
  }}
>
  <span>© 2025 Pastelería Momo&Virgo Sabores Fantasma</span>
  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#9f3c5dff" }}>
    <FaInstagram />
  </a>
  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#9f3c5dff" }}>
    <FaFacebookF />
  </a>
  <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" style={{ color: "#9f3c5dff" }}>
    <FaTiktok />
  </a>
</footer>


  </>

 );

}



export default Layout;
