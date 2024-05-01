import React from "react";
import "./Login.css"; // Import your CSS file

export default function Login() {
  return (
    <div className="d-flex justify-content-center main-login-container">
      <div className="back"></div>
      <div className="login-container">
        <h2 className="text-white fs-3">LOGIN</h2>

        <div className="form-container">
          <form>
            <div className="form-group">
              <label htmlFor="email" className="text-white">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                // placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-white">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                // placeholder="Password"
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <br />
          <p className="text-white">OR</p>
          <div className="oauth-button">
            <img src="https://i.stack.imgur.com/tEXrz.png" alt="OAuth Button" />
          </div>
        </div>
      </div>
    </div>
  );
}
