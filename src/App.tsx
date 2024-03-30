import React, { useEffect } from "react";
import Header from "./components/views/Header";
import AppRouter from "./components/routing/routers/AppRouter";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * Overhauled by Kyrill Hux
 * Updated by Marco Leder
 */
const App = () => {
  useEffect(() => {
    const audio = new Audio("/434061__dangerlaef__alpenhorn-kleine-scheidigg.mp3");
    audio.loop = true;
    audio.play()
      .then(() => {
        console.log("Background sound is playing.");
      })
      .catch(error => {
        console.error("Failed to play background sound:", error);
      });
  }, [])


  return (
    <div>
      <Header height="100" />
      <AppRouter />
    </div>
  );
};

export default App;
