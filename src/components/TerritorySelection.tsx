import { useState, useMemo } from "react";
import { makeStyles } from "tss-react/dsfr";
import { fr } from "@codegouvfr/react-dsfr";
import { Select } from "@codegouvfr/react-dsfr/SelectNext";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";

import { ROUTES } from "..";
import { AvailableTerritoryId } from "../utils/waterLayers";

const useStyles = makeStyles()(() => ({
  title: {
    marginBottom: fr.spacing("4w"),
  },
  visualization: {
    maxWidth: 600,
    marginBottom: fr.spacing("3w"),
  },
  container: {},
  askForAddingData: {
    maxWidth: 600,
  },
}));

const VALUES: { value: AvailableTerritoryId; label: string }[] = [
  { value: "ddtm14", label: "14 - Calvados" },
  { value: "ddt19", label: "19 - Corrèze" },
  { value: "ddt45", label: "45 - Loiret" },
  { value: "ddtm64", label: "64 - Pyrénées-Atlantiques" },
  { value: "ddt67", label: "67 - Bas-Rhin" },
  { value: "ddtm83", label: "83 - Var" },
  { value: "ddt84", label: "84 - Vaucluse" },
];

const modal = createModal({
  id: "aks-for-adding-data-modal",
  isOpenedByDefault: false,
});

export const TerritorySelection = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState<AvailableTerritoryId | undefined>(undefined);

  const viewerHref = useMemo(() => {
    if (value) return ROUTES.Viewer.replace(":territoryId", value);
  }, [value]);

  return (
    <div className={classes.container}>
      <div className={classes.visualization}>
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

      <hr />

      <div className={classes.askForAddingData}>
        <p>Votre territoire n’est pas encore disponible ?</p>
      </div>
      <Button onClick={() => modal.open()}>Faire une demande</Button>

      <modal.Component title="Faire une demande">
        <p>
          Inondata fournit la visualisation de données issues de Plans de Préventions Risque
          Inondation ou des données Territoires Risques Inondation. Si vous souhaitez visualiser les
          données de votre territoire, veuillez renseigner votre adresse mail pour que nous
          revenions vers vous.
        </p>
        <a href="mailto:inondata@ign.fr">
          <Button>Faire une demande</Button>
        </a>
      </modal.Component>
    </div>
  );
};
