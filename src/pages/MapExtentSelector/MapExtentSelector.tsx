import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../..";
import Header from "../../components/Header/Header";
import "./MapExtentSelector.css";
import { Box, Button } from "@mui/material";
import TextFieldWithOptions from "../../components/TextFieldWithOptions/TextFieldWithOptions";
import {
  Address,
  getStreetAddressAndPositionOfInterest,
} from "../../api/ignGeoportail";
import useMap from "../../hooks/useMap";

const MAP_PARAMS = createSearchParams({
  WIDTH: "256",
  HEIGHT: "256",
  SRS: "EPSG:3857",
  BBOX: "-13452.916978191584,6057481.617543647,-12229.924525628765,6058704.60999621",
});

const ORIGINAL_CENTER: [number, number] = [-3.36582694670303, 47.7481313778523];
const ORIGINAL_ZOOM = 5;
const ZOOM_WHEN_SELECTED_ADDRESS = 10;

// TODO : debounce à mettre en place

const MapExtentSelector = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressPropositions, setAddressPropositions] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const setNewCenter = useMap("map", ORIGINAL_CENTER, ORIGINAL_ZOOM);

  useEffect(() => {
    if (inputText.length <= 3 || selectedAddress !== null) return;

    setIsLoading(true);
    getStreetAddressAndPositionOfInterest(inputText)
      .then((res) => {
        const results = res.data.results;
        const addresses = results.map((r) => {
          return { name: r.fulltext, x: r.x, y: r.y };
        });
        setAddressPropositions(addresses);
      })
      .catch((e) => console.log("error " + e))
      .finally(() => setIsLoading(false));
  }, [inputText, selectedAddress]);

  useEffect(() => {
    console.log("useEffect ");
    console.log(selectedAddress);
    if (selectedAddress === null) {
      setNewCenter(ORIGINAL_CENTER, ORIGINAL_ZOOM);
      return;
    }

    setNewCenter(
      [selectedAddress.x, selectedAddress.y],
      ZOOM_WHEN_SELECTED_ADDRESS
    );
  }, [selectedAddress]);

  return (
    <div className="container">
      <Header title={"Téléchargement des données et définition de l’emprise"} />
      <main className="body body__map-extent-selector">
        <TextFieldWithOptions
          value={selectedAddress}
          setValue={setSelectedAddress}
          inputValue={inputText}
          setInputValue={setInputText}
          options={addressPropositions}
          isLoading={isLoading}
        />
        <Box
          id="map"
          sx={{
            width: "100%",
            height: 500,
            mt: 2,
            mb: 2,
          }}
        />
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => navigate(ROUTES.MapViewer + "?" + MAP_PARAMS)}
          disabled={selectedAddress === null}
        >
          Extraire
        </Button>
      </main>
    </div>
  );
};

export default MapExtentSelector;
