import { Button } from "@codegouvfr/react-dsfr/Button";
import { GlobeView, VIEW_EVENTS } from "itowns";
import { useConstCallback } from "powerhooks";
import { MutableRefObject, useEffect, useState } from "react";
import { Event } from "three";

const THREE_D_TILT = 30;
const TWO_D_TILT = 90;

type Props = {
  viewRef: MutableRefObject<GlobeView | null>;
  buttonCss: string;
};

export const TiltToggle = ({ viewRef, buttonCss }: Props) => {
  const [is2D, setIs2D] = useState(true);

  const toggleTilt = useConstCallback(() => {
    const viewControls = viewRef.current?.controls;
    if (!viewControls) return;

    const newTilt = is2D ? THREE_D_TILT : TWO_D_TILT;
    viewControls.setTilt(newTilt, false);
    setIs2D(!is2D);
  });

  const updateIs2DWhenTiltChange = useConstCallback((event: Event) => {
    if (is2D) {
      if (event.tilt < 89) setIs2D(false);
    } else {
      if (event.tilt > 89) setIs2D(true);
    }
  });

  useEffect(() => {
    const currentViewRef = viewRef?.current;
    if (!currentViewRef) return;

    currentViewRef.addEventListener(VIEW_EVENTS.CAMERA_MOVED, updateIs2DWhenTiltChange);
    return () =>
      currentViewRef.removeEventListener(VIEW_EVENTS.CAMERA_MOVED, updateIs2DWhenTiltChange);
  }, [viewRef?.current]);

  return (
    <Button
      className={buttonCss}
      onClick={toggleTilt}
      title={is2D ? "Passer en 3D" : "Passer en 2D"}
    >
      {is2D ? "3D" : "2D"}
    </Button>
  );
};
