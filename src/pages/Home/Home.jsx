import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="homepage-content">
          <h2>Jot Notes</h2>
          <div className="homepage-header-ctas">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-solid-primary btn-rc"
            >
              Log in
            </button>{" "}
            <button
              onClick={() => navigate("/signup")}
              className="btn btn-solid-primary btn-rc"
            >
              Sign up
            </button>
          </div>
        </div>
      </header>
      <main className="homepage-main">
        <div className="homepage-content text-center">
          <h1 className="app-name">Jot Notes</h1>
          <p className="gutter-bottom-16">
            The simplest way to jot down your notes.
            <br />
            Quickly capture what's on your mind and get a reminder later at the
            right place or time.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="btn btn-solid-primary btn-rc"
          >
            Sign up
          </button>
          <p>Or</p>
          <button
            onClick={() => navigate("/login")}
            className="btn-link-primary btn fw-b"
          >
            Already have an account
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
