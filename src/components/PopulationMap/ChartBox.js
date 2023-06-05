import React from "react";
import { withStyles, Hidden, withWidth, Button } from "@material-ui/core";
import BarangayInfo from "./BarangayInfo";
import compose from "recompose/compose";
import PollIcon from "@material-ui/icons/Poll";
import ClearIcon from "@material-ui/icons/Clear";

const styles = (theme) => ({
  box: {
    position: "absolute",
    top: 58,
    left: "1%",
    height: "75%",
    display: "flex",
    // [theme.breakpoints.down("sm","xs")]:{

    //     height: "auto",
    //   }
  },

  innerBox: {
    overflow: "auto",
  },
  button: {
    height: 25,
  },
});

// const visibilty = ["md","lg","xl"]
// const toggleVisibility = (theme) => {
//    if(visibility === ["md","lg","xl"]){

//    }
// }

const ChartBox = ({
  classes,
  highChartLimit,
  lowChartLimit,
  highPopulation,
  lowPopulation,
  width,
  chartVisibility,
  onClick,
}) => (
  <div className={classes.box}>
    {chartVisibility && (
      <div className={classes.innerBox}>
        <BarangayInfo
          title="Barangays With Highest Population"
          chartLimit={highChartLimit}
          population={highPopulation}
        />
        <BarangayInfo
          title="Barangays With lowest Population"
          chartLimit={lowChartLimit}
          population={lowPopulation}
        />
      </div>
    )}
    {window.innerWidth < 960 && (
      <Button
        color="primary"
        variant="contained"
        size="small"
        className={classes.button}
        onClick={onClick}
      >
        {chartVisibility ? <ClearIcon /> : <PollIcon />}
      </Button>
    )}
  </div>
);

export default compose(withStyles(styles), withWidth())(ChartBox);
