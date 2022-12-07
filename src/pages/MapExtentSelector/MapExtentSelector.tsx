import React, { ChangeEvent, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../..";
import Header from "../../components/Header/Header";
import "./MapExtentSelector.css";
import { Button, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import TextFieldWithOptions, {
  Address,
} from "../../components/TextFieldWithOptions/TextFieldWithOptions";
import TextFieldWithOptions2 from "../../components/TextFieldWithOptions/TextFieldWithOptions2";

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
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressPropositions, setAddressPropositions] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (newValue: Address | null): void => {
    setSelectedAddress(newValue);
  };

  useEffect(() => {
    if (inputText.length <= 3 || selectedAddress !== null) return;

    setIsLoading(true);
    getStreetAddressAndPositionOfInterest(inputText)
      .then((res) => {
        console.log(res.data.results);
        const results = res.data.results;
        const addresses = results.map(
          (r: { fulltext: string; x: number; y: number }) => {
            return { name: r.fulltext, x: r.x, y: r.y };
          }
        );
        setAddressPropositions(addresses);
        console.log(addresses);
      })
      .catch((e) => console.log("error " + e))
      .finally(() => setIsLoading(false));
  }, [inputText, selectedAddress]);

  return (
    <div className="container">
      <Header title={"Téléchargement des données et définition de l’emprise"} />
      <main className="body body__map-extent-selector">
        {/* <TextField
          id="outlined-basic"
          label="Adresse"
          variant="outlined"
          value={inputText}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}
        {/* <TextFieldWithOptions
          label="Adresse"
          selectedAddress={selectedAddress}
          onChange={onChange}
          options={addressPropositions}
          isLoading={isLoading}
          inputText={inputText}
          setInputText={setInputText}
        /> */}
        <TextFieldWithOptions2
          value={selectedAddress}
          setValue={setSelectedAddress}
          inputValue={inputText}
          setInputValue={setInputText}
          options={addressPropositions}
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
