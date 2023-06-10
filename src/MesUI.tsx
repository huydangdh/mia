import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useMesSelector } from "./store";
import { MesUserLogOut } from "./auth/auth";

function MesUINavBar() {
  const mesUser = useMesSelector((state) => state.mesUserState.user);
  async function Logout(_event: React.MouseEventHandler<HTMLLinkElement>) {
    let err = await MesUserLogOut()
    console.debug(err)

    window.location.replace("/")
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
            {mesUser.isAuthed ? <Nav.Link bsPrefix="btn btn-danger" color="red" onClick={Logout}>Logout</Nav.Link> : ""}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

interface IMesCardUI {
  card_header: string | JSX.Element | JSX.Element[];
  card_title: string;
  card_img: string | undefined;
  card_body: string | JSX.Element[] | JSX.Element;
  card_footer: string | JSX.Element | JSX.Element[];
}

function MesCardUI(props: IMesCardUI) {
  return (
    <Card>
      {props.card_header ? (
        <Card.Header as="h5">{props.card_header}</Card.Header>
      ) : (
        ""
      )}
      {props.card_img ? <Card.Img variant="top" src={props.card_img} /> : " "}
      <Card.Body>
        <Card.Title>{props.card_title}</Card.Title>
        <Card.Text>{props.card_body}</Card.Text>
      </Card.Body>
      {props.card_footer ? <Card.Footer>{props.card_footer}</Card.Footer> : ""}
    </Card>
  );
}

interface IMesModalUI {
  title: string;
  content: string;
  isShow: boolean;
  onHide?: () => void;
  onShow?: () => void;
}
/**
 * MesModalUI - hien thi Modal  alertt
 *
 */
function MesModalUI(params: IMesModalUI) {
  return (
    <>
      <Modal
        show={params.isShow}
        onHide={params.onHide}
        onShow={params.onShow}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{params.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{params.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={params.onHide}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { MesCardUI as MesUICard, MesModalUI as MesUIModal, MesUINavBar };
