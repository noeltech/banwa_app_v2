import React from "react";
import Slider from "@material-ui/lab/Slider";
import {
  Paper,
  withStyles,
  Card,
  Tabs,
  Tab,
  withWidth,
} from "@material-ui/core";
import compose from "recompose/compose";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const styles = (theme) => ({
  sliderContainer: {
    width: 600,
    position: "absolute",
    bottom: 15,
    zIndex: 3,
    left: "50%",
    marginLeft: -300,
    backgroundColor: theme.palette.primary.dark,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      bottom: 0,
      position: "relative",
      left: "0%",
      marginLeft: 0,
    },
  },
  tab: {
    minWidth: 50,
    minHeight: 30,
    [theme.breakpoints.down("xs")]: {
      minWidth: 30,
    },
    color: "white",
  },
  tabs: {
    minHeight: 30,
    color: "white",
  },
  slider: {
    width: "90%",
    margin: "auto",
    paddingBottom: 10,
    paddingTop: 20,
  },
  thumb: {
    backgroundColor: "#fe9929",
  },
  track: {
    backgroundColor: "#ec7014",
  },
  dot: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "50%",
    width: 10,
    height: 10,
    margin: "0 4px",
  },
  /* Styles applied to a dot if `variant="dots"` and this is the active step. */
  dotActive: {
    backgroundColor: theme.palette.secondary.main,
  },
});

const sliderValue = [
  "1970",
  "1975",
  "1980",
  "1990",
  "1995",
  "2000",
  "2007",
  "2010",
  "2015",
];

const RangeSlider = (props) => (
  <Paper className={props.classes.sliderContainer}>
    {window.innerWidth > 960 ? (
      <div>
        <Slider
          className={props.classes.slider}
          value={props.currentValue}
          min={0}
          max={8}
          step={1}
          onChange={(event, value) => {
            props.onSliderChange(value);
            props.populationSwitch(value);
          }}
          classes={{
            thumb: props.classes.thumb,
            track: props.classes.track,
          }}
        />
        <Tabs
          className={props.classes.tabs}
          value={props.currentValue}
          onChange={(event, value) => {
            props.onSliderChange(value);
            props.populationSwitch(value);
          }}
          // indicatorColor="primary"
          // textColor="primary"
          fullWidth
        >
          {sliderValue.map((label, index) => {
            return (
              <Tab key={index} className={props.classes.tab} label={label} />
            );
          })}
        </Tabs>
      </div>
    ) : (
      <MobileStepper
        variant="dots"
        steps={9}
        position="static"
        activeStep={props.currentValue}
        classes={{
          dot: props.classes.dot,
          dotActive: props.classes.dotActive,
        }}
        nextButton={
          <Button
            size="small"
            onClick={props.handleNext}
            disabled={props.currentValue === 8}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            disabled={props.currentValue === 0}
            onClick={props.handleBack}
          >
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    )}
  </Paper>
);

export default compose(withStyles(styles), withWidth())(RangeSlider);

//
