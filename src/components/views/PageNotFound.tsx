import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import React from "react";
import { Link } from "react-router-dom";
import { HikeLogo } from "components/ui/Logos";

export const PageNotFound: React.FC = () => {
  return (
    <BaseContainer
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        padding: "0 1rem", 
      }}
    >
      
      <h1 style={{ fontSize: "4rem", margin: "0.1rem 0" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", margin: "0.5rem 0" }}>Page not found</h2>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button>
          Go back to home
        </Button>
      </Link>
    </BaseContainer>
  );
};
