import React from "react";
import { useSearchParams } from "react-router-dom";

const MapViewer = () => {
  const [searchParams, _setSearchParams] = useSearchParams();

  return (
    <div className="container">
      <main className="body">
        <h1>MapViewer, params :</h1>
        <ul>
          {Array.from(searchParams.entries()).map((e) => (
            <li>{e[0] + " : " + e[1]}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default MapViewer;
