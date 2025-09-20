import React from "react";
import { useNavigate } from "react-router";
import "./404.css";

function NotFound() {
  const goto = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <button className="primary-btn" onClick={() => goto("/")}>
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
