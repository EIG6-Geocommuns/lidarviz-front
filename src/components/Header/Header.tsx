import { Box, Typography } from "@mui/material";
import React from "react";
import "./Header.css";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <header>
      <Box sx={{ p: 2 }}>
        <Typography>{title}</Typography>
      </Box>
    </header>
  );
};

export default Header;
