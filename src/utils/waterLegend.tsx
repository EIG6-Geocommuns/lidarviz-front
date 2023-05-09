import axios from "axios";
import { AvailableLayer, AvailableTerritory, LAYER_TO_STYLES } from "./waterLayers";

type LegendRule = {
  name: string;
  color: string;
};

export type LegendInfo = LegendRule[];

const gesoserverAxiosInstance = axios.create({
  baseURL: "https://geoserver.bogato.fr/geoserver/inondata/ows",
  timeout: 15000,
});

export const getLegend = <T extends AvailableLayer>(
  territory: AvailableTerritory,
  style: (typeof LAYER_TO_STYLES)[T][number]
): Promise<LegendInfo> => {
  const params = {
    service: "WMS",
    request: "GetLegendGraphic",
    format: "application/json",
    layer: LegendFetchLayer[territory],
    style,
  };

  type RuleFromApi = { title: string; symbolizers: { Polygon: { fill: string } }[] };

  return gesoserverAxiosInstance.get("", { params }).then((res) => {
    const rules: RuleFromApi[] = res.data.Legend[0].rules;
    const legendInfo: LegendInfo = rules.map((rule) => {
      return { name: rule.title, color: rule.symbolizers[0].Polygon.fill };
    });
    return legendInfo;
  });
};

const LegendFetchLayer: Record<AvailableTerritory, AvailableLayer> = {
  DDT64: "inondata:DDT64_Pau_isocote_probabilite_faible",
  DDT83: "inondata:DDT83_BESSE_SUR_ISSOLE",
  DDT84: "inondata:DDT84_Orange_Aleas",
};
