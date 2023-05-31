import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import { memo, useMemo, useState } from "react";
import { makeStyles } from "tss-react/dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { useConstCallback } from "powerhooks";

const useStyles = makeStyles()({
  displayButton: {
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
  hiddenPanel: {
    display: "none",
  },
});

type Props = {
  layersSetters: JSX.Element;
  legend?: JSX.Element;
};

const TabsSystem = ({ layersSetters, legend }: Props) => {
  const { classes } = useStyles();
  const [isDisplayed, setIsDisplayed] = useState(true);
  const [selectedTabId, setSelectedTabId] = useState("layers");

  const displayIcon = useMemo(
    () => (isDisplayed ? "fr-icon-arrow-down-s-line" : "fr-icon-arrow-up-s-line"),
    [isDisplayed]
  );

  const displayTitle = useMemo(
    () => (isDisplayed ? "Cacher la barre latérale" : "Afficher la barre latérale"),
    [isDisplayed]
  );

  const panelClassName = useMemo(
    () => (isDisplayed ? undefined : classes.hiddenPanel),
    [isDisplayed]
  );

  const onTabChange = useConstCallback((tabId: string) => {
    setSelectedTabId(tabId);
    if (!isDisplayed) setIsDisplayed(true);
  });

  return (
    <>
      <Button
        className={classes.displayButton}
        iconId={displayIcon}
        title={displayTitle}
        priority="tertiary"
        onClick={() => setIsDisplayed(!isDisplayed)}
      />
      <Tabs
        selectedTabId={selectedTabId}
        tabs={[
          { tabId: "layers", label: "Couches" },
          { tabId: "legend", label: "Légende" },
        ]}
        classes={{ panel: panelClassName }}
        onTabChange={onTabChange}
      >
        {selectedTabId === "layers" ? layersSetters : legend}
      </Tabs>
    </>
  );
};

export const MemoizedTabsSystem = memo(TabsSystem);
