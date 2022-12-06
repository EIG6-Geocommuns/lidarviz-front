import React, { ChangeEvent, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../..";
import Header from "../../components/Header/Header";
import "./MapExtentSelector.css";
import { Button, TextField } from "@mui/material";

const MapExtentSelector = () => {
  const navigate = useNavigate();
  const mapParams = createSearchParams({
    WIDTH: "256",
    HEIGHT: "256",
    SRS: "EPSG:3857",
    BBOX: "-13452.916978191584,6057481.617543647,-12229.924525628765,6058704.60999621",
  });

  const [inputText, setInputText] = useState<string>("");
  const onChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    console.log(e.target.value);
    const text = e.target.value;
    setInputText(text);
  };

  // https://wxs.ign.fr/calcul/geoportail/geocodage/rest/0.1/completion?type=StreetAddress,PositionOfInterest&maximumResponses=5&text=bou

  return (
    <div className="container">
      <Header title={"Téléchargement des données et définition de l’emprise"} />
      <main className="body body__map-extent-selector">
        <TextField
          id="outlined-basic"
          label="Adresse"
          variant="outlined"
          value={inputText}
          onChange={onChange}
        />
        <Button
          variant="outlined"
          sx={{ mt: 1 }}
          onClick={() => navigate(ROUTES.MapViewer + "?" + mapParams)}
        >
          Extraire
        </Button>
      </main>
    </div>
  );
};

export default MapExtentSelector;
