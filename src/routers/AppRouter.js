import React from "react";

import "./AppRouter.css";
import Header from "../components/Header";
import PopulationMap from "../components/PopulationMap/PopulationMap";

const AppRouter = () => (
  <div className="app1">
    <Header />
    <PopulationMap />
  </div>
);

export default AppRouter;
// <Route path='/population' component={PopulationMap}/>
