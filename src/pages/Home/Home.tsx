import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../..";
//import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <main className="body">
        <h1>Géocommuns LiDAR HD</h1>
        <img
          id="itowns-img"
          src={require("../../assets/img/itowns_logo.png")}
          alt="logo iTowns"
        />
        <Box sx={{ mb: 12 }}>
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => navigate(ROUTES.MapExtentSelector)}
          >
            Nouvelle visualisation
          </Button>
          <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
            Ouvir...
          </Button>
        </Box>
      </main>
    </div>
  );
};

export default Home;
