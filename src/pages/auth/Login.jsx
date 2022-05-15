import React, { useRef, useState, useEffect } from "react";
import "./auth.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAxios } from "utils/useAxios";
import { useAuth } from "context";

import { validateEmail, validatePassword } from "./utils/inputValidateUtils";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialFormValidateState = {
    isEmailValid: true,
    isPasswordValid: true,
  };
  const [formValidateState, setFormValidateState] = useState(
    initialFormValidateState
  );

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, setEncodedToken } = useAuth();
  const { makeRequest, response, error } = useAxios();

  const loginHandler = () => {
    setFormValidateState((prev) => initialFormValidateState);
    if (
      validateEmail(emailRef.current.value) &&
      validatePassword(passwordRef.current.value)
    ) {
      makeRequest({
        method: "post",
        url: "/api/auth/login",
        data: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      });
    } else {
      if (!validateEmail(emailRef.current.value)) {
        setFormValidateState((prev) => ({ ...prev, isEmailValid: false }));
      }
      if (!validatePassword(passwordRef.current.value)) {
        setFormValidateState((prev) => ({ ...prev, isPasswordValid: false }));
      }
    }
  };

  const guestLoginHandler = () => {
    emailRef.current.value = "adarshbalika@gmail.com";
    passwordRef.current.value = "adarshBalika123";
    loginHandler();
  };

  useEffect(() => {
    console.log("response use effect", response);
    if (response) {
      setEncodedToken(response.encodedToken);
      localStorage.setItem("encodedToken", response.encodedToken);
    }
    if (error) {
      passwordRef.current.value = "";
    }
  }, [response, error]);

  useEffect(() => {
    if (isLoggedIn && location?.state?.from?.pathname) {
      navigate(location.state.from.pathname);
    } else if (isLoggedIn) {
      navigate("/user/allnotes");
    }
  }, [isLoggedIn]);

  return (
    <main className="gutter-bottom-32 auth-main-wrapper">
      <section className="auth-box">
        <h1 className="auth-box-heading h4">Log in to your account</h1>
        <form action="" className="auth-form">
          <div className="input-container">
            <label htmlFor="input-email">
              <i className="fas fa-envelope"></i>
            </label>
            <input
              type="email"
              name="email"
              id="input-email"
              placeholder="Email"
              ref={emailRef}
            />
          </div>
          {!formValidateState.isEmailValid && (
            <p className="error-message">Email address is not valid</p>
          )}
          <div className="input-container">
            <label htmlFor="input-password">
              <i className="fas fa-lock"></i>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="input-password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          {!formValidateState.isPasswordValid && (
            <p className="error-message">
              {passwordRef.current.value.length >= 6
                ? "Password must containe one uppercase letter, one smallcase letter and a number"
                : "Password should be minimum 6 char long"}
            </p>
          )}
          <div className="checkbox-input-container">
            <input
              onChange={() => setShowPassword((prev) => !prev)}
              type="checkbox"
              className="checkbox"
              id="show-password"
            />{" "}
            <label htmlFor="show-password">Show password</label>
          </div>

          <button
            onClick={loginHandler}
            type="button"
            className="btn auth-btn form-btn btn-rc"
          >
            Sign in
          </button>
          <button
            type="button"
            className="btn btn-link-primary btn-forgot-password"
          >
            Forgot password
          </button>
          <p className="form-guide text-muted text-center">
            Or sign in with test user
          </p>
          <button
            onClick={guestLoginHandler}
            type="button"
            className="text-center form-btn btn-rc"
          >
            <i className="fas fa-user"></i> Guest Login
          </button>
          <footer className="auth-box-footer">
            Don't have an account ?
            <button className="btn btn-link-primary">
              <Link className="link" to="/signup">
                {" "}
                Sign-up
              </Link>
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default Login;
