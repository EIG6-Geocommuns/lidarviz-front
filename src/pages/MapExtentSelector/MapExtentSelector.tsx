import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../..";
import Header from "../../components/Header/Header";
import "./MapExtentSelector.css";

const MapExtentSelector = () => {
  const navigate = useNavigate();
  const mapParams = createSearchParams({
    WIDTH: "256",
    HEIGHT: "256",
    SRS: "EPSG:3857",
    BBOX: "-13452.916978191584,6057481.617543647,-12229.924525628765,6058704.60999621",
  });

  return (
    <div className="container">
      <Header title={"Téléchargement des données et définition de l’emprise"} />
      <main className="body body__map-extent-selector">
        <button
          className="btn btn-outline btn-large"
          onClick={() => navigate(ROUTES.MapViewer + "?" + mapParams)}
        >
          Extraire
        </button>
      </main>
    </div>
  );
};

export default MapExtentSelector;
