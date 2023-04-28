import { fr } from "@codegouvfr/react-dsfr";
import { CircularProgress, List, ListItem } from "@mui/material";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import {
  LegendInfo,
  AvailableTerritory,
  TERRITORY_TO_STYLES,
  StyleToLegendLabel,
  getLegend,
} from "../utils/waterLayers";
import { useState, useEffect, useMemo } from "react";

const useStyles = makeStyles()(() => ({
  title: {
    display: "flex",
    alignItems: "center",
    gap: fr.spacing("2w"),
    marginBottom: 0,
  },
  list: {
    padding: 0,
  },
  listItem: {
    marginTop: fr.spacing("1v"),
    marginBottom: fr.spacing("1v"),
    paddingLeft: 8,
    paddingRight: 8,
  },
  item: {
    display: "flex",
  },
  cercle: {
    width: fr.spacing("3w"),
    height: fr.spacing("3w"),
    marginRight: fr.spacing("1w"),
    borderRadius: 16,
  },
}));

type Props<T extends AvailableTerritory> = {
  territory: T;
  style: TERRITORY_TO_STYLES[T];
};

export const Legend = <T extends AvailableTerritory>({ territory, style }: Props<T>) => {
  const { css, cx, classes } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [legendInfo, setLegendInfo] = useState<LegendInfo>([]);

  useEffect(() => {
    setIsLoading(true);
    getLegend(territory, style)
      .then((res) => {
        const legendInfoWithoutOther = res.filter((legendRule) => legendRule.name !== "Autre");
        setLegendInfo(legendInfoWithoutOther);
      })
      .catch((e) => console.warn("error " + e))
      .finally(() => setIsLoading(false));
  }, [territory, style]);

  const listItems = useMemo(() => {
    return legendInfo.map((legendRule) => {
      return (
        <ListItem key={legendRule.name} className={classes.listItem}>
          <span className={classes.item}>
            <span className={cx(classes.cercle, css({ background: legendRule.color }))} />{" "}
            {legendRule.name}
          </span>
        </ListItem>
      );
    });
  }, [legendInfo]);

  return (
    <div>
      <div className={classes.title}>
        <b>{StyleToLegendLabel[style]}</b>
        {isLoading && <CircularProgress size={20} />}
      </div>

      <List className={classes.list}>{listItems}</List>
    </div>
  );
};
