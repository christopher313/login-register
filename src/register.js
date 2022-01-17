import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "./api/axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bcrypt from "bcryptjs";

//Chemin vers l'API
const REGISTER_URL = "/register";

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const Register = () => {
  //variables

  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [errorMessage, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === verifyPassword;
    setValidMatch(match);
  }, [password, verifyPassword]);

  useEffect(() => {
    setErrorMsg("");
  }, [email, password, verifyPassword]);

  //hash mot de passe

  //affiche les entrées du formulaire d'inscription
  const handleSubmit = (event) => {
    const testEmail = EMAIL_REGEX.test(email);
    const testPassword = PASSWORD_REGEX.test(password);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    if (!testEmail || !testPassword) {
      setErrorMsg("problèmes avec le regex");
      return;
    }
    console.log(email, password);
    setSuccess(true);
    axios
      .post(REGISTER_URL, { name: name, email: email, password: hash })
      .then((reponse) => {
        window.localStorage.setItem("user", {
          name: name,
          email: email,
        });
        console.log(reponse.data);
        console.log(reponse.data.accesToken);
        setAcceptTerms(true);
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  };

  //Formulaire d'inscription
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Inscription</title>
        </Helmet>
      </HelmetProvider>

      {success ? (
        <section className="section-login-register">
          <h1>Enregistrement réussi</h1>
        </section>
      ) : (
        <section className="section-login-register">
          <p
            ref={errRef}
            className={errorMessage ? "errormessage" : "off"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <form
            className="form-login-register"
            onSubmit={handleSubmit}
            method="POST"
          >
            <h1>Inscription</h1>

            <label htmlFor="name">Nom:</label>
            <input
              autoComplete="off"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre Nom"
              required
            ></input>

            <label htmlFor="email">
              Mail:
              <span className={validEmail ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hidden" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              autoComplete="off"
              ref={userRef}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre Mail"
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            ></input>

            <p
              id="emailnote"
              className={emailFocus && email && !validEmail ? "on" : "off"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <br />
              Le mail doit contenir un @ + . + fr,com,etc.
            </p>

            <label htmlFor="password">
              Mot de Passe:
              <span className={validPassword ? "valid" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validPassword || !password ? "hidden" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              name="password"
              type="password"
              id="password"
              ref={userRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" Votre Mot de passe"
              required
              aria-describedby="passwordNote"
              aria-invalid={validPassword ? "false" : "true"}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            ></input>

            <p
              id="passwordNote"
              className={
                passwordFocus && password && !validPassword ? "on" : "off"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 charactères minimum.
              <br />
              Doit contenir
              <br />
              Lettres, nombres, Majuscules, Minuscules.
            </p>

            <label htmlFor="password">
              Vérification:
              <span
                className={validMatch && validPassword ? "valid" : "hidden"}
              >
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch ? "hidden" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              disabled={!validPassword}
              name="verifypassword"
              type="password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              placeholder="Vérification du Mot de passe"
              required
            ></input>
            <div>
              <input
                name="terms"
                type="checkbox"
                value={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.value)}
                required
              ></input>
              <label>
                <Link to="/terms" className="linksPageTerms">
                  J'accepte les termes d'utilisations
                </Link>
              </label>
            </div>
            <button
              disabled={
                !validEmail || !validPassword || !validMatch ? true : false
              }
            >
              Valider
            </button>
            <div>
              <Link to="/login" className="linksPages">
                Login
              </Link>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
