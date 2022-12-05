import React from "react";
import "./Header.css";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <header className="header">
      <p>{title}</p>
    </header>
  );
};

export default Header;
