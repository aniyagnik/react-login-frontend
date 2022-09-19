import React, { useRef, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { BASE_URL } from "../constant/constants"
import HeadBox from "../component/HeadBox";

const LOGIN_URL = BASE_URL+"/auth";

const Login = () => {
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        { username: username, password: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          crossDomain: true,
        }
      );
      setUsername("");
      setPassword("");
      setSuccess(true);
      Cookies.set('accessKey',response.data.accessToken)
      // console.log("success");
    } catch (err) {
      console.log("err in login: ", err);
      if (!err.response) setErrMsg("No Server Response");
      else if (err.response.status === 409) setErrMsg("Error in Logging In");
      else if (err.response.status === 404) setErrMsg("Username or Password is wrong");
      else setErrMsg("Login Failed");
      errRef.current.focus();
    }
  };
  return (
    <div>
      <HeadBox />
      {success ? (
        <Navigate to={"/users"} />
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1> Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">username:</label>
            <input
              type="text"
              id="username"
              value={username}
              ref={usernameRef}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account? <br />
            <span className="line">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;
