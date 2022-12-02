import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <p>Home Page</p>
      </header>

      <main className="body">
        <h1>Géocommuns LiDAR HD</h1>
        <img
          id="itowns-img"
          src={require("./assets/img/itowns_logo.png")}
          alt="logo iTowns"
        />
        <div className="buttons">
          <button className="button primary-button">
            Nouvelle visualisation
          </button>
          <button className="button secondary-button">Ouvir...</button>
        </div>
      </main>
    </div>
  );
};

export default App;
