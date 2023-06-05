import React from "react";
import ReactDOM from "react-dom";
// import configureStore from './store/configureStore';

import AppRouter from "./routers/AppRouter";
import "mapbox-gl/dist/mapbox-gl.css";
// import 'react-rangeslider/lib/index.css'

import "normalize.css/normalize.css";
// import './styles/styles.scss';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#62727b",
      main: "#37474f",
      dark: "#102027",
    },
    secondary: {
      light: "#ffac42",
      main: "#f47b00",
      dark: "#ba4c00",
    },
    type: "dark",
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <AppRouter />
  </MuiThemeProvider>,
  document.getElementById("app")
);
