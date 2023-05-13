import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import {
  useLoginMutation,
  useSigupMutation,
} from "../features/auth/authApiSlice";
import "../styles/sign.css";

function SignUp() {
  const userRef = useRef();
  const errRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [signup] = useSigupMutation();
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
      const signupData = await signup({
        email,
        password,
        firstName,
        lastName,
      }).unwrap();
      if (signupData.status === 200) {
        const userData = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...userData, email }));
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        navigate("/profile");
      }
    } catch (err) {
      const errMsg = err.data.message.split(":")[1];
      if (!err?.status) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg(errMsg);
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleFirstNameInput = (e) => setFirstName(e.target.value);
  const handleLastNameInput = (e) => setLastName(e.target.value);
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
          <FontAwesomeIcon icon={faCircleUser} size="5x" />
          <h1>Sign Up</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="firstName">FirstName *</label>
              <input
                type="text"
                id="firstName"
                ref={userRef}
                value={firstName}
                onChange={handleFirstNameInput}
                autoComplete="off"
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">LastName *</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastNameInput}
                autoComplete="off"
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="username">Email *</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={handleUserInput}
                autoComplete="off"
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                onChange={handlePwdInput}
                value={password}
                required
              />
            </div>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <button className="sign-in-button">Sign Up</button>
          </form>
        </section>
      )}
    </main>
  );
}

export default SignUp;
