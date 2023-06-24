import React from "react";
import "./home.css";
import SignupForm from "../components/signup/SignupForm";

export default function Home() {
  return (
    <div className="home-container">
      {/* stage left - hero */}
      <div className="hero-text-container">
        <div className="tag-line">
          <h1>Clean. Simple. Organized</h1>
        </div>
        <div className="info">
          <p>
            Plan Simply is an all-in-one app for managing tasks, calendars, and
            planning. Stay effortlessly organized with our intuitive interface,
            smart reminders, and seamless integration. Simplify your life and
            conquer your to-do list.
          </p>
        </div>
      </div>
      {/* stage right - form */}
      <div className="form-container">
        <SignupForm />
      </div>
    </div>
  );
}
