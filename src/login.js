import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContexte from "./context/AuthProvider";
import axios from "./api/axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

const LOGIN_URL = "api/v1/auth/login";

function Login() {
  //variables
  const { setAuth } = useContext(AuthContexte);
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
  const handleSubmit = async (event) => {
    try {
      const reponse = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(reponse?.data));
      const accesToken = reponse?.data?.accesToken;
      setAuth({ email, password, accesToken });
      setEmail("");
      setPassword("");
      setSuccesMsg(true);
    } catch (error) {
      if (!error?.reponse) {
        setErrorMsg("Le serveur ne répond pas");
      } else if (error.reponse?.status === 400) {
        setErrorMsg("erreur, mot de passe ou email incorrectes");
      } else if (error.reponse?.status === 401) {
        setErrorMsg("Connection non autorisé");
      } else if (error.reponse?.status === 404) {
        setErrorMsg("Requête Post impossible");
      } else {
        setErrorMsg("erreur...");
      }
      errRef.current.focus();
    }

    console.log(`
Email: ${email}
Password: ${password}`);

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
