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
