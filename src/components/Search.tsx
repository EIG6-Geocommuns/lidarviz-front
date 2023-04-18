import { useEffect, useState } from "react";

import { City, getCities } from "../api/geoApiGouv";
import TextFieldWithOptions from "../components/TextFieldWithOptions";

// TODO : debounce à mettre en place
type Props = {
  moveToLocalisation(x: number, y: number): void;
};

export const Search = ({ moveToLocalisation }: Props) => {
  const [inputText, setInputText] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cityPropositions, setCityPropositions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputText.length <= 3) return;

    setIsLoading(true);
    getCities(inputText, true)
      .then((res) => {
        setCityPropositions(res.data);
      })
      .catch((e) => console.warn("error " + e))
      .finally(() => setIsLoading(false));
  }, [inputText, selectedCity]);

  useEffect(() => {
    if (selectedCity === null) {
      return;
    }

    moveToLocalisation(selectedCity.centre.coordinates[0], selectedCity.centre.coordinates[1]);
  }, [selectedCity]);

  return (
    <TextFieldWithOptions<City>
      value={selectedCity}
      setValue={setSelectedCity}
      inputValue={inputText}
      setInputValue={setInputText}
      options={cityPropositions}
      isLoading={isLoading}
      getOptionLabel={(option: City) => {
        const label = option.nom;
        if (option.codesPostaux.length === 1) return label + ", " + option.codesPostaux[0];
        return label;
      }}
    />
  );
};
