import React from "react";
import Header from "../../components/Header/Header";
import "./Home.css";

const Home = () => {
  return (
    <div className="app">
      <Header title={"Home"} />

      <main className="body">
        <h1>Géocommuns LiDAR HD</h1>
        <img
          id="itowns-img"
          src={require("../../assets/img/itowns_logo.png")}
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

export default Home;
