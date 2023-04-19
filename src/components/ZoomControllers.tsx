import { useConstCallback } from "powerhooks";
import { GlobeView } from "itowns";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { MutableRefObject, useEffect, useState } from "react";

const useStyles = makeStyles()((theme) => ({
  controllerButton: {
    height: fr.spacing("5w"),
    width: fr.spacing("5w"),
    color: theme.decisions.background.actionHigh.blueFrance.default,
    backgroundColor: theme.decisions.background.default.grey.default,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&&&:hover": {
      backgroundColor: theme.decisions.background.default.grey.hover,
    },
  },
  tiltButton: {
    fontSize: "large",
    marginBottom: fr.spacing("1w"),
  },
  zoomButton: {
    fontSize: "x-large",
  },
  zoomInButton: {
    borderBottom: "1px solid",
    borderColor: theme.decisions.background.actionHigh.blueFrance.default,
  },
}));

type Props = {
  viewRef: MutableRefObject<GlobeView | null>;
  containerClassName?: string;
};

const THREE_D_TILT = 30;
const TWO_D_TILT = 90;

export const ZoomControllers = ({ viewRef, containerClassName }: Props) => {
  const { classes, cx } = useStyles();
  const [is2D, setIs2D] = useState(true);

  const toggleTilt = useConstCallback(() => setIs2D(!is2D));

  const updateViewTilt = useConstCallback(() => {
    const viewControls = viewRef.current?.controls;
    if (!viewControls) return;
    const newTilt = is2D ? TWO_D_TILT : THREE_D_TILT;
    viewControls.setTilt(newTilt, false);
  });

  useEffect(() => {
    updateViewTilt();
  }, [updateViewTilt, is2D]);

  const zoom = useConstCallback((zoomIn: boolean) => {
    const viewControls = viewRef.current?.controls;
    if (!viewControls) return;

    const actualZoom = viewControls.getZoom();
    const newZoom = zoomIn ? actualZoom + 1 : actualZoom - 1;
    viewControls.setZoom(newZoom, false);
  });

  const zoomIn = useConstCallback(() => zoom(true));
  const zoomOut = useConstCallback(() => zoom(false));

  return (
    <div className={containerClassName}>
      <Button className={cx(classes.controllerButton, classes.tiltButton)} onClick={toggleTilt}>
        {is2D ? "3D" : "2D"}
      </Button>
      <Button
        className={cx(classes.controllerButton, classes.zoomButton, classes.zoomInButton)}
        onClick={zoomIn}
      >
        +
      </Button>
      <Button className={cx(classes.controllerButton, classes.zoomButton)} onClick={zoomOut}>
        -
      </Button>
    </div>
  );
};
