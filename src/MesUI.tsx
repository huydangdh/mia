import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap"

interface IMesCardUI {
  card_header: string | JSX.Element | JSX.Element[]
  card_title: string,
  card_img: string | undefined,
  card_body: string | JSX.Element[] | JSX.Element,
  card_footer: string | JSX.Element | JSX.Element[]
}

function MesCardUI(props: IMesCardUI) {
  return (
    <Card>
      {props.card_header ? <Card.Header as="h5">{props.card_header}</Card.Header> : ""}
      {props.card_img ? <Card.Img variant="top" src={props.card_img} /> : " "}
      <Card.Body>
        <Card.Title>{props.card_title}</Card.Title>
        <Card.Text>
          {props.card_body}
        </Card.Text>
      </Card.Body>
      {props.card_footer ? <Card.Footer>{props.card_footer}</Card.Footer>:""}
    </Card>
  )
}

interface IMesModalUI {
  title: string,
  content: string
}

function MesModalUI(params: IMesModalUI) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{params.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {params.content}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { MesCardUI, MesModalUI }
