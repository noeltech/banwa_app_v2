import React from "react";
// import {BarChart, Bar, XAxis, YAxis, Tooltip, LabelList} from 'recharts'
import {
  Card,
  List,
  Typography,
  ListItem,
  withStyles
} from "@material-ui/core";

const percentValue = (x, highestPop) =>
  `${Math.round((x / highestPop) * 100)}%`;

const styles = theme => ({
  box: {
    padding: 10,
    marginBottom: 8,
    width: 220,
    marginRight: 5,
    backgroundColor: theme.palette.primary.dark
  },
  InsideBox: {
    display: "flex",
    justifyContent: "space-between"
  }
});

const Chart = props => {
  return (
    <Card className={props.classes.box}>
      <Typography variant="body2" align="center" color="textSecondary">
        {props.title}
      </Typography>
      {props.population.map((data, index) => {
        return (
          <div key={index}>
            <div className={props.classes.InsideBox}>
              <Typography color="textSecondary">{data.barangayName}</Typography>
              <Typography color="textSecondary">{data.population}</Typography>
            </div>
            <div>
              <svg key={index} width="100%" height="10">
                <rect
                  width="100%"
                  height="6"
                  fill="#37474f"
                  rx="3"
                  ry="3"
                ></rect>
                <rect
                  width={percentValue(data.population, props.chartLimit)}
                  height="6"
                  fill="#f47b00"
                  rx="3"
                  ry="3"
                >
                  <animate
                    attributeName="width"
                    from="0"
                    to={percentValue(data.population, props.chartLimit)}
                    dur="300ms"
                  />
                </rect>
              </svg>
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default withStyles(styles)(Chart);
