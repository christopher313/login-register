import React from "react";
import Login from "./login.js";
import Register from "./register.js";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Accueil</title>
        </Helmet>
      </HelmetProvider>
      <nav className="nav-accueil">
        <div>
          <Link to="/" className="linksPagesAccueil">
            Accueil
          </Link>
        </div>
        <div>
          <Link to="/login" className="linksPagesAccueil">
            Connexion
          </Link>
        </div>
      </nav>
    </>
  );
}

export default App;
