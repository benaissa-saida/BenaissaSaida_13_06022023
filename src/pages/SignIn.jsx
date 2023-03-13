import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import "../styles/signIn.css";

function SignIn() {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMail, setErrMail] = useState(false);
  const [errPsw, setErrPsw] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPassword("");
      navigate("/profile");
    } catch (err) {
      const errMsg = err.data.message.split(":")[1];
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        if (errMsg.includes("Password")) {
          setErrPsw(true);
        } else {
          setErrMail(true);
        }
        setErrMsg(errMsg);
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPassword(e.target.value);
  return (
    <main className="main bg-dark">
      {isLoading ? (
        <section className="loading">
          <h1 className="loading-msg">Loading</h1>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </section>
      ) : (
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username *</label>
              <input
                className={errMail ? "show-error" : ""}
                type="text"
                id="username"
                ref={userRef}
                value={email}
                onChange={handleUserInput}
                autoComplete="off"
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password *</label>
              <input
                className={errPsw ? "show-error" : ""}
                type="password"
                id="password"
                onChange={handlePwdInput}
                value={password}
                required
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      )}
    </main>
  );
}

export default SignIn;
