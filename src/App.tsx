import React, { useEffect } from "react";
import Header from "./components/views/Header";
import AppRouter from "./components/routing/routers/AppRouter";
import { ErrorProvider } from "./components/ui/ErrorContext";

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
    </ErrorProvider>
  );
};
export default App;
