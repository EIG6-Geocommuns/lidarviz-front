import { useState, useMemo } from "react";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";
import { Select } from "@codegouvfr/react-dsfr/SelectNext";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { ROUTES } from "..";
import { AvailableTerritoryId } from "../utils/waterLayers";

const useStyles = makeStyles()(() => ({
  title: {
    marginBottom: fr.spacing("4w"),
  },
  container: {
    maxWidth: 600,
  },
}));

const VALUES: { value: AvailableTerritoryId; label: string }[] = [
  { value: "ddtm14", label: "DDTM 14" },
  { value: "ddt19", label: "DDT 19" },
  { value: "ddt45", label: "DDT 45" },
  { value: "ddtm64", label: "DDTM 64" },
  { value: "ddt67", label: "DDT 67" },
  { value: "ddtm83", label: "DDTM 83" },
  { value: "ddt84", label: "DDT 84" },
];

export const TerritorySelection = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState<AvailableTerritoryId | undefined>(undefined);

  const viewerHref = useMemo(() => {
    if (value) return ROUTES.Viewer.replace(":territoryId", value);
  }, [value]);

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

      <a href={viewerHref}>
        <Button disabled={value === undefined}>Lancer la Visualisation</Button>
      </a>
    </div>
  );
};
