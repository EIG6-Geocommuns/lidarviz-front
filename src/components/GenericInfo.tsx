import { memo } from "react";
import { GenericDataInfo } from "geocommuns-core";

const DOCS: { name: string; link?: string; size?: string }[] = [
  // { name: "Description", link: "/viewer/ddt67", size: "1,2 Mo" },
];

const GenericInfo = () => {
  const textInfo = (
    <>
      <h5>Une visualisation en 3D pour mieux rendre compte du risque inondation en France</h5>
      <p>
        Le risque inondation est un phénomène naturel considéré en France comme majeur en raison des
        dégâts matériels, environnementaux, humains, économiques qu’il est susceptible de générer à
        chaque événement. Inondata cherche à faciliter la compréhension de ces phénomènes en
        simplifiant la lecture des données existantes par la valeur ajoutée qu’apporte la 3D.
      </p>
      <ul>
        <li>
          Pour la description du territoire, Inondata affiche des données publiques de l’IGN. À
          terme, le service utilisera des produits dérivés des données issues du{" "}
          <a
            href="https://www.ign.fr/institut/lidar-hd-vers-une-nouvelle-cartographie-3d-du-territoire"
            target="_blank"
          >
            programme national LiDAR HD
          </a>{" "}
          pour une description récente, fine et détaillée.
        </li>

        <li>
          Pour la représentation des inondations, nous affichons les données issues des Plans de
          Préventions Risques Inondation (PPRI) et Territoires Risques Inondation (TRI) fournies par
          les Direction Départementales des Territoires (et de la mer) volontaires.
        </li>
      </ul>
      <p>
        La visualisation en 3D est développée avec{" "}
        <a href="https://itowns" target="_blank">
          iTowns
        </a>
        , une librairie de développement open source développée par l’IGN. Elle est basée sur le
        moteur de rendu client d’affichage THREE.js, permettant la navigation dans de la donnée
        spatiale et géo-spatiale multi-échelle, une interaction performante en 2D et en 3D ainsi
        qu’une personnalisation avancée.
      </p>
    </>
  );
  return <GenericDataInfo textInfo={textInfo} docs={DOCS} />;
};

export const MemoizedGenericInfo = memo(GenericInfo);
