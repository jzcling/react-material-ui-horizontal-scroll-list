import { Fade, makeStyles } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import React, { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  scrollIndicatorLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    background: "rgba(70, 70, 70, 0.9)",
    color: "white",
    padding: "4px",
    height: "calc(100% - 6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  },
  scrollIndicatorRight: {
    position: "absolute",
    top: 0,
    right: 0,
    background: "rgba(70, 70, 70, 0.9)",
    color: "white",
    padding: "4px",
    height: "calc(100% - 6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  },
}));

export default function HorizontalScrollIndicators(props) {
  const classes = useStyles();
  const { showLeft, showRight } = props;

  return (
    <Fragment>
      <Fade in={showLeft}>
        <div className={classes.scrollIndicatorLeft}>
          <NavigateBefore />
        </div>
      </Fade>
      <Fade in={showRight}>
        <div className={classes.scrollIndicatorRight}>
          <NavigateNext />
        </div>
      </Fade>
    </Fragment>
  );
}
