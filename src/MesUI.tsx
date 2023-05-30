import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap"

interface IMesCardUI {
  card_header: string | JSX.Element | JSX.Element[]
  card_title: string,
  card_img: string | undefined,
  card_body: string | JSX.Element[] | JSX.Element,
  card_footer: any
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
        <Button variant="primary">Run</Button>
      </Card.Body>
    </Card>
  )
}

interface IMesModalUI {
  show: boolean
}

function MesModalUI(a: IMesModalUI) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { MesCardUI, MesModalUI }
