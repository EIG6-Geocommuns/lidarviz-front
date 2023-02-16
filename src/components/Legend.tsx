import { List, ListItem } from "@mui/material";

const CLASS_TO_COLOR = {
  Batiment: "#DB0E9A",
  "Zone imperméable": "#F9352B",
  "Zone perméable": "#A9A595",
  "Surface d'eau": "#3B6FBB",
  Feuillus: "#64E897",
  Conifères: "#3E6749",
  Broussaille: "#F5B32F",
  Vigne: "#7F2996",
  "Herbacés/Cultures": "#FFF52F",
  "Terre labourée": "#E8E491",
  Piscine: "#3DE6EB",
  Coupe: "#8AB3A0",
  Autre: "#FFFFFF",
};

export const Legend = () => {
  const listItems = Object.entries(CLASS_TO_COLOR).map(([key, value]) => {
    return (
      <ListItem key={key}>
        <p style={{ color: value }}>{key}</p>
      </ListItem>
    );
  });

  return <List>{listItems}</List>;
};
