import { useEffect } from 'react';
import { APP_URL } from './dataMock';
import { useMesSelector } from './store'
import { Navigate, useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import { combineReducers } from '@reduxjs/toolkit';

function MesTabUI() {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home" navbarScroll={true}>
      <Nav.Item>
        <Nav.Link href="/">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item><Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
function MesCardUI({ app_name }) {
  const navigate = useNavigate()
  function RunApp(path: string) {
    navigate(String().concat(APP_URL.ROOT,"/app/",path))
  }
  return (
    <Col xs={6} md={4}>
      <Card className='md-2'>
        <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1885831cc06%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1885831cc06%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.5078125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
        <Card.Body>
          <Card.Title>{app_name}</Card.Title>
          <Card.Text>
            [[APP_DESC]].
          </Card.Text>
          <Button variant="primary" onClick={e=> RunApp("")}>[[btnLunch]]</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

function App() {
  const mesUserState = useMesSelector((state) => state.mesUserState)

  function GetAppList() {
    const app_list = mesUserState.user.permissions
    const tmp = Array<JSX.Element>()
    for (let index = 0; index < app_list.length; index++) {
      const element = app_list[index];
      let elm = <MesCardUI key={index} app_name={element.app_name}></MesCardUI>
      tmp.push(elm)
    }
    return tmp
  }

  if (!mesUserState.user.isAuthed) return <Navigate to={"/Login"} />
  else if (mesUserState.user.isAuthed) {
    return (
      <>
        <MesTabUI></MesTabUI>
        <Container>
          <p></p>
          <Row>
            {GetAppList()}
          </Row>
        </Container>
      </>
    )
  }
}

export default App
