import { useState } from "react";
import { IRootState, MesUserState, AppDispatch, setUser } from "../store";
import { Navigate } from "react-router-dom";

import { database } from "../dataMock";

import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mesUser = useSelector<IRootState, MesUserState>((state) => state.mesUserStore)
  const dispatch: AppDispatch = useDispatch()


  // Generate JSX code for error message
  const renderErrorMessage = (name: string) =>
    name === errorMessages.name && (
      <div className="msg_error">{errorMessages.message}</div>
    );

  const handleSubmit = (event: any) => {
    // Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        dispatch(setUser({ user: { id: "001", userName: "Deng Guang Hui", userToken: "LHF001", permissions: [{ app_name: "app1", pers: "Start|Update|Delete" }], miscInfo: {}, isAuthed: true } }))
      }

    }
    else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }

  };
  // test 
  const doTestGetUser = () => {
    dispatch(setUser({ user: { id: "001", userName: "Deng Guang Hui", userToken: "LHF001", permissions: [{ app_name: "app1", pers: "Start|Update|Delete" }], miscInfo: {}, isAuthed: true } }))
  }

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );


  return (
    <>
      <div className="login-form">
        <div className="title">Sign In</div>
        {mesUser.user.isAuthed ? <Navigate replace to={"/"} /> : renderForm}
        <button onClick={doTestGetUser}>Do_Test_Get_User</button>
        <div> Current_user : {JSON.stringify((mesUser.user))}</div>
      </div>
    </>
  )
}


export default LoginPage;
