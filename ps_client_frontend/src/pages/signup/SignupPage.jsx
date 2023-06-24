import React from "react";
import SignupForm from "../../components/signup/SignupForm";

export default function SignupPage() {
  return (
    <div className="home-container">
      {/* stage left - hero */}
      <div className="hero-text-container">
        <div className="tag-line">
          <h1>Get Started Organizing.</h1>
        </div>
        <div className="info">
          <p>
            We understand the challenges of getting started, and we're here to
            support you every step of the way. With Plan Simply, you'll find the
            motivation and tools you need to embrace productivity and make
            progress towards your goals. Let's conquer the day together, one
            simple step at a time.
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
