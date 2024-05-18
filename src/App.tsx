import React, { useEffect } from "react";
import Header from "./components/views/Header";
import AppRouter from "./components/routing/routers/AppRouter";
import { ErrorProvider } from "./components/ui/ErrorContext";
import {ToastContainer} from "react-toastify";

/**
 *Happycoding!
 *ReactTemplatebyLucasPelloni
 *OverhauledbyKyrillHux
 *UpdatedbyMarcoLeder
 */

const App = () => {
  return (
    <ErrorProvider>
      <AppRouter />
        <ToastContainer />
    </ErrorProvider>

  );
};
export default App;
