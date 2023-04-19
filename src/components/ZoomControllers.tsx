import { useConstCallback } from "powerhooks";
import { GlobeControls } from "itowns";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { MutableRefObject } from "react";

const useStyles = makeStyles()((theme) => ({
  zoomButton: {
    height: fr.spacing("5w"),
    width: fr.spacing("5w"),
    fontSize: "x-large",
    color: theme.decisions.background.actionHigh.blueFrance.default,
    backgroundColor: theme.decisions.background.default.grey.default,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&&&:hover": {
      backgroundColor: theme.decisions.background.default.grey.hover,
    },
  },
  zoomInButton: {
    borderBottom: "1px solid",
    borderColor: theme.decisions.background.actionHigh.blueFrance.default,
  },
}));

type Props = {
  globeControlsRef: MutableRefObject<GlobeControls | null>;
  containerClassName?: string;
};

export const ZoomControllers = ({ globeControlsRef, containerClassName }: Props) => {
  const { classes, cx } = useStyles();

  const zoom = useConstCallback((zoomIn: boolean) => {
    const globeControls = globeControlsRef.current;
    if (!globeControls) return;

    const actualZoom = globeControls.getZoom();
    const newZoom = zoomIn ? actualZoom + 1 : actualZoom - 1;
    globeControls.setZoom(newZoom, false);
  });

  const zoomIn = useConstCallback(() => zoom(true));
  const zoomOut = useConstCallback(() => zoom(false));
  return (
    <div className={containerClassName}>
      <Button className={cx(classes.zoomButton, classes.zoomInButton)} onClick={zoomIn}>
        +
      </Button>
      <Button className={classes.zoomButton} onClick={zoomOut}>
        -
      </Button>
    </div>
  );
};
