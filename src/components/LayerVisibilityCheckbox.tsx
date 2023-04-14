import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { useEffect, useState } from "react";
import { useConstCallback } from "powerhooks";

type Props = {
  layerId: string;
  setLayerVisibility(layerId: string, visibility: boolean): void;
  defaultVisibility?: boolean;
};

export const LayerVisibilityCheckbox = ({
  layerId,
  setLayerVisibility,
  defaultVisibility = true,
}: Props) => {
  const [visibility, setVisibility] = useState(defaultVisibility);

  const handleVisibilityUpdate = useConstCallback(() => {
    setVisibility(!visibility);
  });

  useEffect(() => {
    setLayerVisibility(layerId, visibility);
  }, [visibility]);

  return (
    <Checkbox
      options={[
        {
          label: layerId,
          nativeInputProps: {
            checked: visibility,
            onChange: handleVisibilityUpdate,
          },
        },
      ]}
    />
  );
};
