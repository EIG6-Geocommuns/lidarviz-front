import React, { ChangeEvent, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../..";
import Header from "../../components/Header/Header";
import "./MapExtentSelector.css";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://wxs.ign.fr/calcul/geoportail/geocodage/rest/0.1/",
  timeout: 1500,
});

const MAP_PARAMS = createSearchParams({
  WIDTH: "256",
  HEIGHT: "256",
  SRS: "EPSG:3857",
  BBOX: "-13452.916978191584,6057481.617543647,-12229.924525628765,6058704.60999621",
});

const getStreetAddressAndPositionOfInterest = (searchedText: string) => {
  return axiosInstance.get("completion", {
    params: {
      type: "StreetAddress,PositionOfInterest",
      maximumResponses: "5",
      text: searchedText,
    },
  });
};

const MapExtentSelector = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState<string>("");
  const [addressPropositions, setAddressPropositions] = useState([]);

  const onChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    const text = e.target.value;
    setInputText(text);
  };

  useEffect(() => {
    if (inputText.length <= 3) return;
    getStreetAddressAndPositionOfInterest(inputText)
      .then((res) => setAddressPropositions(res.data.results))
      .catch((e) => console.log("error " + e));
  }, [inputText]);

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
          onClick={() => navigate(ROUTES.MapViewer + "?" + MAP_PARAMS)}
        >
          Extraire
        </Button>
      </main>
    </div>
  );
};

export default MapExtentSelector;
