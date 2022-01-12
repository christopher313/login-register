import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "./api/axios";

const REGISTER_URL = "api/v1/auth/register";

function Register() {
  //variables

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  //affiche les entrées du formulaire d'inscription
  const handleSubmit = async (event) => {
    if (password === verifyPassword) {
      try {
        const reponse = await axios.post(
          REGISTER_URL,
          JSON.stringify({
            email,
            password,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(reponse.data);
        console.log(reponse.accesToken);
      } catch (error) {}
      acceptTerms(true);
      console.log(`
        Name: ${name}
        Email: ${email}
        Password: ${password}
        VerifyPassword: ${verifyPassword}
        Terms: ${acceptTerms}`);
    } else {
      console.log("mot de passe non identique. Veuillez rééssayer");
    }

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
      <section className="section-login-register">
        <form
          className="form-login-register"
          onSubmit={handleSubmit}
          method="POST"
        >
          <h1>Inscription</h1>
          <input
            autoComplete="off"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre Nom"
            required
          ></input>
          <input
            autoComplete="off"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" Votre Mail"
            required
          ></input>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Votre Mot de passe"
            required
          ></input>
          <input
            name="verifypassword"
            type="password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            placeholder="Vérification du Mot de passe"
            required
          ></input>
          <label>
            <input
              name="terms"
              type="checkbox"
              value={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.value)}
              required
            ></input>
            J'accepte les termes d'utilisations
          </label>
          <button>Valider</button>
          <div>
            <Link to="/login" className="linksPages">
              Login
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
