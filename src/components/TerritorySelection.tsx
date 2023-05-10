import { useState } from "react";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";
import { Select } from "@codegouvfr/react-dsfr/SelectNext";

const useStyles = makeStyles()(() => ({
  title: {
    marginBottom: fr.spacing("4w"),
  },
  container: {
    maxWidth: 600,
  },
}));

export const TerritorySelection = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState("");

  const VALUES = [
    { value: "ddt84", label: "DDT 84" },
    { value: "ddt45", label: "DDT 45" },
  ];

  return (
    <div className={classes.container}>
      <h4 className={classes.title}>Visualisation d'un territoire</h4>
      <Select
        label="Territoires disponibles"
        nativeSelectProps={{
          onChange: (event) => setValue(event.target.value),
          value,
        }}
        options={VALUES}
      />
    </div>
  );
};
