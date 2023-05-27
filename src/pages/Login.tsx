import { useState } from "react";
import { AppDispatch, setUser, useMesSelector } from "../store";
import { Navigate, useNavigate } from "react-router-dom";

import { database } from "../dataMock";

import { useDispatch } from "react-redux";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";

function LoginPage() {
  const [errorMessages, setErrorMessages] = useState({});

  const mesUser = useMesSelector((state) => state.mesUserState.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // test
  const doTestGetUser = () => {
    dispatch(setUser(database.user));
    navigate("/");
  };

  // JSX code for login form

  function LoginForm() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password : </Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    );
  }

  return (
    <>
      <div className="login-form">
        <Card>
          <Card.Header>LOGIN</Card.Header>
          <Card.Body>
            {mesUser.isAuthed ? <Navigate replace to={"/"} /> : <LoginForm />}
          </Card.Body>
        </Card>
        <p></p>
        <Button onClick={doTestGetUser}>Do_Test_Get_User</Button>
        <div> Current_user : {JSON.stringify(mesUser)}</div>
      </div>
    </>
  );
}

export default LoginPage;
