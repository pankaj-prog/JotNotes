import React, { useRef, useState, useEffect } from "react";
import "./auth.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "./utils/inputValidateUtils";
import { useAuth } from "context";
import { useAxios } from "utils/useAxios";

const SignUp = () => {
  const initalFormValidateState = {
    isNameValid: true,
    isEmailValid: true,
    isPasswordValid: true,
  };

  const [formValidateState, setFormValidateState] = useState(
    initalFormValidateState
  );

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, setEncodedToken } = useAuth();
  const { makeRequest, response, error } = useAxios();

  const signUpHandler = () => {
    setFormValidateState((prev) => initalFormValidateState);
    if (
      validateName(nameRef.current.value) &&
      validateEmail(emailRef.current.value) &&
      validatePassword(passwordRef.current.value)
    ) {
      makeRequest({
        method: "post",
        url: "/api/auth/signup",
        data: {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      });
    } else {
      if (!validateName(nameRef.current.value)) {
        setFormValidateState((prev) => ({ ...prev, isNameValid: false }));
      }
      if (!validateEmail(emailRef.current.value)) {
        setFormValidateState((prev) => ({ ...prev, isEmailValid: false }));
      }
      if (!validatePassword(passwordRef.current.value)) {
        setFormValidateState((prev) => ({ ...prev, isPasswordValid: false }));
      }
    }
  };

  useEffect(() => {
    if (response) {
      setEncodedToken(response.encodedToken);
      localStorage.setItem("encodedToken", response.encodedToken);
    }
  }, [response]);

  useEffect(() => {
    if (isLoggedIn && location?.state?.from?.pathname) {
      navigate(location.state.from.pathname);
    } else if (isLoggedIn) {
      navigate("/user");
    }
  }, [isLoggedIn]);

  return (
    <main className="gutter-bottom-32 auth-main-wrapper">
      <section className="auth-box">
        <h1 className="auth-box-heading h4">Sign up </h1>
        <form action="" className="auth-form">
          <div className="input-container">
            <label htmlFor="input-name">
              <i className="fas fa-user"></i>
            </label>
            <input
              type="text"
              name="name"
              id="input-name"
              placeholder="Full Name"
              ref={nameRef}
            />
          </div>
          {!formValidateState.isNameValid && (
            <p className="error-message">
              Name should be minimum 2 char and max 30 char long
            </p>
          )}

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
              type="password"
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
            <input type="checkbox" className="checkbox" name="" id="checkbox" />{" "}
            <label htmlFor="checkbox">
              I’m in for emails with exciting discounts and personalized
              recommendations
            </label>
          </div>
          <button
            onClick={signUpHandler}
            type="button"
            className="auth-btn form-btn btn-rc"
          >
            Sign up
          </button>
          <p className="text-muted text-sm form-alert text-center">
            By signing up, you agree to our Terms of Use and Privacy Policy.
          </p>
        </form>
        <footer className="auth-box-footer">
          Already have an account ?
          <button className="btn btn-link-primary ">
            <Link className="link" to="/login">
              {" "}
              Log in
            </Link>
          </button>
        </footer>
      </section>
    </main>
  );
};

export default SignUp;
