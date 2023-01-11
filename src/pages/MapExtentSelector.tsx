import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "..";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import TextFieldWithOptions from "../components/TextFieldWithOptions";
import useMap from "../hooks/useMap";
import { City, getCities } from "../api/geoApiGouv";

const MAP_PARAMS = createSearchParams({
  WIDTH: "256",
  HEIGHT: "256",
  SRS: "EPSG:3857",
  BBOX: "-13452.916978191584,6057481.617543647,-12229.924525628765,6058704.60999621",
});

const ORIGINAL_CENTER: [number, number] = [
  2.5764414841767787, 46.51407673990174,
];
const ORIGINAL_ZOOM = 5;
const UNITS = ["km", "miles"] as const;

// TODO : debounce à mettre en place

const MapExtentSelector = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityPropositions, setCityPropositions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUnits, setSelectedUnits] =
    useState<typeof UNITS[number]>("km");

  const { setNewCenterAndNewZoom, fitViewToPolygon } = useMap(
    "map",
    ORIGINAL_CENTER,
    ORIGINAL_ZOOM
  );

  useEffect(() => {
    if (inputText.length <= 3 || selectedCity !== null) return;

    setIsLoading(true);
    getCities(inputText)
      .then((res) => {
        setCityPropositions(res.data);
      })
      .catch((e) => console.warn("error " + e))
      .finally(() => setIsLoading(false));
  }, [inputText, selectedCity]);

  useEffect(() => {
    if (selectedCity === null) {
      setNewCenterAndNewZoom(ORIGINAL_CENTER, ORIGINAL_ZOOM);
      return;
    }

    fitViewToPolygon(selectedCity.contour.coordinates);
  }, [selectedCity]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <TextFieldWithOptions<City>
            value={selectedCity}
            setValue={setSelectedCity}
            inputValue={inputText}
            setInputValue={setInputText}
            options={cityPropositions}
            isLoading={isLoading}
            getOptionLabel={(option: City) =>
              option.nom + ", " + option.codesPostaux[0]
            }
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1, p: 2 }}
            onClick={() => navigate(ROUTES.MapViewer + "?" + MAP_PARAMS)}
            disabled={selectedCity === null}
          >
            Extraire
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MapExtentSelector;
