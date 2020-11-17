import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./firebase";

import './SignUp.css'

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div className="login">
      <div className="login_form">
      <div className="heading">
        <h1>Covid Center manager</h1>
      </div>
      <h4>Sign Up</h4>
      <form onSubmit={handleSignUp}>
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
          
        <button type="submit">Signup</button>
        </div>
      </form>
      </div>

    </div>
  );
};

export default withRouter(SignUp);
