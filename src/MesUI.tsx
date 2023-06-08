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
  content: string,
  isShow: boolean,
  onHide?: () => void,
  onShow?: () => void
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
        <Modal.Body>
          {params.content}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={params.onHide}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { MesCardUI, MesModalUI }
