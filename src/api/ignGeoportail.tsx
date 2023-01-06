import axios from "axios";

export type Address = {
  name: string;
  x: number;
  y: number;
};

const axiosInstance = axios.create({
  baseURL: "https://wxs.ign.fr/calcul/geoportail/geocodage/rest/0.1/",
  timeout: 1500,
});

type StreetAddressAndPositionOfInterestResponse = {
  data: {
    results: {
      fulltext: string;
      x: number;
      y: number;
    }[];
  };
};

export const getStreetAddressAndPositionOfInterest = (
  searchedText: string
): Promise<StreetAddressAndPositionOfInterestResponse> => {
  return axiosInstance.get("completion", {
    params: {
      type: "StreetAddress,PositionOfInterest",
      maximumResponses: "5",
      text: searchedText,
    },
  });
};

type City = {
  nom: string;
  code: string;
  codesPostaux: string[];
  codeEpci: string[];
  codeDepartement: string;
  codeRegion: string;
};

//TODO adapt return type
export const getCities = (searchedText: string): Promise<City[]> => {
  const geoApiAxiosInstance = axios.create({
    baseURL: "https://geo.api.gouv.fr/",
    timeout: 1500,
  });

  return geoApiAxiosInstance.get("communes", {
    params: {
      nom: searchedText,
      fields: "nom,code,codesPostaux,codeEpci,codeDepartement,codeRegion",
      format: "json",
      geometry: "contour",
    },
  });
};
