import { Button } from "@codegouvfr/react-dsfr/Button";
import { GlobeView, VIEW_EVENTS } from "itowns";
import { useConstCallback } from "powerhooks";
import { MutableRefObject, useEffect, useState } from "react";
import { Event } from "three";
import { makeStyles } from "tss-react/dsfr";

const useStyles = makeStyles<{ transform: string }>()((_theme, { transform }) => ({
  compass: {
    width: 25,
    transform: transform,
  },
}));

type Props = {
  viewRef: MutableRefObject<GlobeView | null>;
  buttonCss: string;
};

export const Compass = ({ viewRef, buttonCss }: Props) => {
  const [heading, setHeading] = useState(0);
  const { classes } = useStyles({ transform: `rotate(${heading}deg)` });

  const updateHeadingWhenTiltChange = useConstCallback((event: Event) => {
    setHeading(event.heading);
  });

  const moveHeadingToNorth = useConstCallback(() => {
    const viewControls = viewRef.current?.controls;
    if (!viewControls) return;

    viewControls.setHeading(0, false);
  });

  useEffect(() => {
    const currentViewRef = viewRef?.current;
    if (!currentViewRef) return;

    currentViewRef.addEventListener(VIEW_EVENTS.CAMERA_MOVED, updateHeadingWhenTiltChange);
    return () =>
      currentViewRef.removeEventListener(VIEW_EVENTS.CAMERA_MOVED, updateHeadingWhenTiltChange);
  }, [viewRef?.current]);

  return (
    <Button className={buttonCss} onClick={moveHeadingToNorth} title="Rétablir vers le nord">
      <img src={require("../../assets/icons/compass.png")} className={classes.compass} />
    </Button>
  );
};
