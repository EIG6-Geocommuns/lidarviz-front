import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const MapViewer = () => {
  const [searchParams, _setSearchParams] = useSearchParams();

  return (
    <div>
      MapViewer, params :
      <ul>
        {Array.from(searchParams.entries()).map((e) => (
          <li>{e[0] + " : " + e[1]}</li>
        ))}
      </ul>
    </div>
  );
};

export default MapViewer;
