import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";

import axios from "./api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify(user, password), {
        header: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(JSON.stringify(res.data));
      console.log(JSON.stringify(res));
      const accessToken = res.data.accessToken;

      setAuth({ user, password, accessToken });
      setUser("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err.response) setErrMsg("No server response");
      else if (err.response.status === 400)
        setErrMsg("Missing username or password");
      else if (err.response.status === 401) setErrMsg("unauthorised");
      else setErrMsg("Login Failed");
 
      errRef.current.focus();
    }
  };

  return (
    <div>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a>Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1> Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">username:</label>
            <input
              type="text"
              id="username"
              value={user}
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
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
            <p>
              Need an Account? <br />
              <span className="line">
                <a href="#">Sign Up</a>
              </span>
            </p>
          </form>
        </section>
      )}
    </div>
  );
};

export default Login;
