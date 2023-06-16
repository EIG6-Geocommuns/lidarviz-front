import axios from "axios";
import { Coordinate } from "ol/coordinate";

export type City = {
  nom: string;
  code: string;
  codesPostaux: string[];
  codeEpci: string[];
  codeDepartement: string;
  codeRegion: string;
  contour: {
    type: "Polygon";
    coordinates: Coordinate[][];
  };
  centre: {
    type: "Point";
    coordinates: [number, number];
  };
};

const geoApiAxiosInstance = axios.create({
  baseURL: "https://geo.api.gouv.fr/",
  timeout: 1500,
});

export const getCities = (
  searchedText: string,
  centerInsteadOfBoudaries?: boolean,
  codeDepartement?: number
): Promise<{ data: City[] }> => {
  let fields = "nom,code,codesPostaux,codeEpci,codeDepartement,codeRegion,";
  fields = centerInsteadOfBoudaries ? fields + "centre" : fields + "contour";

  return geoApiAxiosInstance.get("communes", {
    params: {
      nom: searchedText,
      fields,
      format: "json",
      codeDepartement: codeDepartement || 29,
    },
  });
};
