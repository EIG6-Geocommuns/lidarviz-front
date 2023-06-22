import { Button } from "@codegouvfr/react-dsfr/Button";
import { GlobeView } from "itowns";
import { useConstCallback } from "powerhooks";
import { MutableRefObject } from "react";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles()((theme) => ({
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
  buttonCss: string;
};

export const ZoomButtons = ({ viewRef, buttonCss }: Props) => {
  const { classes, cx } = useStyles();

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
    <div>
      <Button
        className={cx(buttonCss, classes.zoomButton, classes.zoomInButton)}
        onClick={zoomIn}
        title="Zoom avant"
      >
        +
      </Button>
      <Button className={cx(buttonCss, classes.zoomButton)} onClick={zoomOut} title="Zoom arrière">
        -
      </Button>
    </div>
  );
};
