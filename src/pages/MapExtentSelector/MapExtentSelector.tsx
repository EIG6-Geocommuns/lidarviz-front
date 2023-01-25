import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../..";
import Header from "../../components/Header/Header";
//import "./MapExtentSelector.css";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
const UNITS = ["km", "miles"] as const;

// TODO : debounce à mettre en place

const MapExtentSelector = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressPropositions, setAddressPropositions] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUnits, setSelectedUnits] =
    useState<typeof UNITS[number]>("km");

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header title={"Téléchargement des données et définition de l’emprise"} />
      <Grid
        container
        spacing={2}
        sx={{
          mt: 2,
          mb: 2,
          width: "90%",
          maxWidth: 1200,
        }}
      >
        <Grid item xs={12} md={8}>
          <Box
            id="map"
            sx={{ height: "100%", minHeight: 800, maxHeight: 1000 }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Titre"
            placeholder="visualisation-sans-titre-1"
            fullWidth
            sx={{ mb: 2 }}
          />

          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <InputLabel id="units">Unité</InputLabel>
            <Select
              labelId="units"
              value={selectedUnits}
              displayEmpty
              onChange={(e) =>
                setSelectedUnits(e.target.value as typeof UNITS[number])
              }
              sx={{ ml: 2, width: 100 }}
            >
              {UNITS.map((u) => (
                <MenuItem value={u}>{u}</MenuItem>
              ))}
            </Select>
          </Box>

          <TextFieldWithOptions
            value={selectedAddress}
            setValue={setSelectedAddress}
            inputValue={inputText}
            setInputValue={setInputText}
            options={addressPropositions}
            isLoading={isLoading}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1, p: 2 }}
            onClick={() => navigate(ROUTES.MapViewer + "?" + MAP_PARAMS)}
            disabled={selectedAddress === null}
          >
            Extraire
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MapExtentSelector;
