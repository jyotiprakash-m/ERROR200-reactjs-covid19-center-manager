import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./firebase.js";
import { AuthContext } from "./Auth.js";

import './Login.css'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <div className="login_form">
      <div className="heading">
        <h1>Covid Center manager</h1>
      </div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div className="form">
          <div className="form_input">
            <label>
              Email
            </label>
            <input name="email" type="email" placeholder="Email" />
          </div>
          <div className="form_input">      
            <label>
              Password
            </label>
            <input name="password" type="password" placeholder="Password" />
          </div>
          
        <button type="submit">Log in</button>
        </div>
      </form>
      </div>

    </div>
  );
};

export default withRouter(Login);
