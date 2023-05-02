import axios from "axios";
import { AvailableTerritory, TERRIRORY_TO_NAME, TERRITORY_TO_STYLES } from "./waterLayers";

type LegendRule = {
  name: string;
  color: string;
};

export type LegendInfo = LegendRule[];

const gesoserverAxiosInstance = axios.create({
  baseURL: "https://geoserver.bogato.fr/geoserver/inondata/ows",
  timeout: 15000,
});

export const getLegend = <T extends AvailableTerritory>(
  territory: T,
  style: TERRITORY_TO_STYLES[T]
): Promise<LegendInfo> => {
  const params = {
    service: "WMS",
    request: "GetLegendGraphic",
    format: "application/json",
    layer: TERRIRORY_TO_NAME[territory],
    style: style,
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
