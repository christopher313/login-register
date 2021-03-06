import React, { useState, useRef, useEffect } from "react";
import axios from "./api/axios";

//librairie pour changer le header de la page index.html
import { Helmet, HelmetProvider } from "react-helmet-async";
///

import { Link } from "react-router-dom";

//librairie pour le hashage
import bcrypt from "bcryptjs";
////

const LOGIN_URL = "/login";

function Login() {
  //variables

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const [succesMsg, setSuccesMsg] = useState(false);
  //////////////

  /*paramètre*/
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  //
  const handleSubmit = (event) => {
    //système de hashage de mot de passe
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    //requête poste
    axios
      .post(LOGIN_URL, { email: email, password: hash })
      .then((reponse) => {
        setEmail("");
        setPassword("");
        setSuccesMsg(true);
        localStorage.setItem("user", { email: email });
        console.log(reponse.data);
        console.log(reponse.data.accessToken);
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  };
  /////////////////

  //Le formulaire
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Connexion</title>
        </Helmet>
      </HelmetProvider>
      {succesMsg ? (
        <section className="section-login-register">
          <h1>Connexion réussi</h1>
        </section>
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
//////////////

export default Login;
