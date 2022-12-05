import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../..";

const MapExtentSelector = () => {
  const navigate = useNavigate();
  const mapParams = createSearchParams({
    WIDTH: "256",
    HEIGHT: "256",
    SRS: "EPSG:3857",
    BBOX: "-13452.916978191584,6057481.617543647,-12229.924525628765,6058704.60999621",
  });

  return (
    <div>
      <p>MapExtentSelector</p>
      <button onClick={() => navigate(ROUTES.MapViewer + "?" + mapParams)}>
        Visualiser
      </button>
    </div>
  );
};

export default MapExtentSelector;
