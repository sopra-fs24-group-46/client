// ErrorContext.tsx

import React, { createContext, useState, useContext } from "react";
import ErrorBox from "./ErrorBox";
import PropTypes from "prop-types";

const ErrorContext = createContext();

export const ErrorProvider = props => {
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message) => {
    setErrorMessage(message);
  };

  const hideError = () => {
    setErrorMessage("");
  };

  return (
    <ErrorContext.Provider value={{ showError, hideError }}>
      {props.children}
      {errorMessage && <ErrorBox message={errorMessage} onClose={hideError} />}
    </ErrorContext.Provider>
  );
};

ErrorProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};