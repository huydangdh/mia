import { useEffect } from 'react';
import { APP_URL } from './dataMock';
import { useMesSelector } from './store'
import { Navigate, useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import { Card, Button, Container } from 'react-bootstrap';

function App() {

  const navigate = useNavigate();

  const mesUserState = useMesSelector((state) => state.mesUserState)

  function btnLunch(_event: React.MouseEventHandler<HTMLButtonElement>) {
    navigate({
      pathname: String().concat(APP_URL.APP_URL_ROOT, "/", APP_URL.APP_WORKTIME_RECORD)
    }, { replace: true })
  }

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

  function MesCardUI() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1885831cc06%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1885831cc06%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.5078125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
        <Card.Body>
          <Card.Title>[[APP_NAME]]</Card.Title>
          <Card.Text>
            [[APP_DESC]].
          </Card.Text>
          <Button variant="primary">[[APP_HREF]]</Button>
        </Card.Body>
      </Card>
    );
  }

  useEffect(() => {
    console.log(`[I] App_mesUserState : ${JSON.stringify(mesUserState)},${new Date().getTime()}`)
  }, [])

  if (!mesUserState.user.isAuthed) return <Navigate to={"/Login"} />
  else {
    return (
      <>
        <MesTabUI></MesTabUI>
        <Container>
          <p></p>
          <MesCardUI></MesCardUI>
        </Container>
      </>
    )
  }
}


export default App
