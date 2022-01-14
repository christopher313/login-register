import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "./api/axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

const LOGIN_URL = "/api/v1/auth/login";

function Login() {
  //variables
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const [succesMsg, setSuccesMsg] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);
  //affiche les entrées du formulaire d'inscription
  const handleSubmit = (event) => {
    axios
      .post(LOGIN_URL, { email: email, password: password })
      .then((response) => {
        setEmail("");
        setPassword("");
        setSuccesMsg(true);
        localStorage.setItem("User", { email: email, password: password });
        console.log(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(
      `Email: ${email}
      Password: ${password}`
    );

    event.preventDefault();
  };

  //Formulaire d'inscription
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Connexion</title>
        </Helmet>
      </HelmetProvider>
      {succesMsg ? (
        <h1>Connexion réussi</h1>
      ) : (
        <section className="section-login-register">
          <form
            className="form-login-register"
            onSubmit={handleSubmit}
            method="POST"
          >
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Connexion</h1>
            <input
              ref={userRef}
              autoComplete="off"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" Votre Mail"
              required
            ></input>
            <input
              ref={userRef}
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" Votre Mot de passe"
              required
            ></input>
            <button>Valider</button>
            <Link to="/register" className="linksPages">
              Inscription
            </Link>
          </form>
        </section>
      )}
      ;
    </>
  );
}

export default Login;
