import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="homepage-content">
          <h2>Jot Notes</h2>
          <div className="homepage-header-ctas">
            <Link to="/login" className="btn btn-solid-primary btn-rc link">
              Log in
            </Link>{" "}
            <Link
              to="/signup"
              className="btn link btn-solid-primary btn-rc link"
            >
              Sign up
            </Link>
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
          <Link to="/signup" className="btn btn-solid-primary btn-rc link">
            Sign up
          </Link>
          <p>Or</p>
          <Link to="/login" className="btn-link-primary link fw-b">
            Already have an account
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
