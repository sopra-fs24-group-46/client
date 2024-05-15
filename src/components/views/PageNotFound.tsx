import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import React from "react";
import { Link, Navigate } from "react-router-dom";

export const PageNotFound: React.FC = () => {
  return (
    
    <BaseContainer>
      <h1 style={{ fontSize: "4rem" }}>404</h1>
      <h2 style={{ fontSize: "2rem" }}>Page not found</h2>
      <Link to="/">
        <Button>
          Go back to home
        </Button>
      </Link>
    </BaseContainer>
  );
};
