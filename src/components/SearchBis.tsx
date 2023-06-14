import { memo, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { City, getCities } from "../api/geoApiGouv";
import { SearchInput } from "./SearchInput";
import { useConstCallback } from "powerhooks/useConstCallback";

type Props = {
  moveToLocalisation(x: number, y: number): void;
};

export const SearchBis = ({ moveToLocalisation }: Props) => {
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);

  const getOptions = useConstCallback(
    (inputText: string): Promise<City[]> =>
      getCities(inputText, true)
        .then((res) => {
          return res.data.slice(0, 5);
        })
        .catch((e) => {
          console.warn("error " + e);
          return [];
        })
  );

  useEffect(() => {
    if (selectedCity === undefined) {
      return;
    }

    moveToLocalisation(selectedCity.centre.coordinates[0], selectedCity.centre.coordinates[1]);
  }, [selectedCity]);

  return (
    <SearchInput<City>
      value={selectedCity}
      onValueChange={setSelectedCity}
      getOptions={getOptions}
      getOptionLabel={(option: City) => {
        const label = option.nom;
        if (option.codesPostaux.length === 1) return label + ", " + option.codesPostaux[0];
        if (option.codesPostaux.length < 1) return label;
        return label + ", " + option.codesPostaux[0].substring(0, 2) + "000";
      }}
      debounceDelay={1000}
      noOptionText="Pas de résultat"
      loadingText={
        <div
          style={{ alignItems: "center", width: "100%", display: "flex", justifyContent: "center" }}
        >
          <CircularProgress color="inherit" size={20} />
        </div>
      }
      dsfrSearchBarProps={{ label: "Rechercher une commune" }}
    />
  );
};

export const MemoSearchBis = memo(SearchBis);
