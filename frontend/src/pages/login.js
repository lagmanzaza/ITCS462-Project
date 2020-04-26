import React, { useState } from "react";
import loginService from "../services/authentication/login";
import { withRouter } from "react-router-dom";

export default withRouter((props) => {
  const onLogin = async (username, password, setMessage) => {
    try {
      const result = await loginService(username, password);
      localStorage.setItem("token", result.data.token);
      props.history.push("/index");
    } catch (e) {
      console.error(e.response.data.message);
      setMessage(e.response.data.message);
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setMessage] = useState("");
  return (
    <div style={{ marginTop: 30 }}>
      <div
        className="card"
        style={{ width: 20 + "em", display: "block", margin: "auto" }}
      >
        <img
          src="https://picsum.photos/768"
          alt="ss"
          style={{ marginBottom: 30 }}
        />
        <div style={{ width: 80 + "%", display: "block", margin: "auto" }}>
          <div className="form-group">
            <label htmlFor="paperInputs1">Username</label>
            <input
              type="text"
              placeholder="Username"
              style={{ width: 100 + "%" }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paperInputs1">Password</label>
            <input
              type="password"
              placeholder="Password"
              style={{ width: 100 + "%" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
          onClick={() => onLogin(username, password, setMessage)}
        >
          Login
        </button>
        <p style={{ color: "red" }}>{errMessage}</p>
      </div>
    </div>
  );
});
