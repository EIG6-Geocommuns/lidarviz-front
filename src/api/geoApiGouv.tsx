import axios from "axios";

// TODO move type into own file
export type City = {
  nom: string;
  code: string;
  codesPostaux: string[];
  codeEpci: string[];
  codeDepartement: string;
  codeRegion: string;
};

const geoApiAxiosInstance = axios.create({
  baseURL: "https://geo.api.gouv.fr/",
  timeout: 1500,
});

export const getCities = (searchedText: string): Promise<{ data: City[] }> => {
  return geoApiAxiosInstance.get("communes", {
    params: {
      nom: searchedText,
      fields: "nom,code,codesPostaux,codeEpci,codeDepartement,codeRegion",
      format: "json",
      geometry: "contour",
    },
  });
};
