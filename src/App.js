import React from "react";
import TopButton from "./components/feature/TopButton";
import GlobalStyle from "./Shared/GlobalStyle";
import Router from "./Shared/Router";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Router />
      <TopButton />
    </div>
  );
};

export default App;
