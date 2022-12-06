import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../..";
import Header from "../../components/Header/Header";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <Header title={"Home"} />

      <main className="body">
        <h1>Géocommuns LiDAR HD</h1>
        <img
          id="itowns-img"
          src={require("../../assets/img/itowns_logo.png")}
          alt="logo iTowns"
        />
        <div className="buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate(ROUTES.MapExtentSelector)}
          >
            Nouvelle visualisation
          </button>
          <button className="btn btn-secondary">Ouvir...</button>
        </div>
      </main>
    </div>
  );
};

export default Home;
