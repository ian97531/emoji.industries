import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import { fontColor } from "../constants";

const left = 3.3;
const right = 5.5;
const bottom = 20;
const top = 0;
const distance = 500;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "30px"
  },
  box: {
    display: "flex",
    flexDirection: "column"
  },
  typography: {
    fontFamily: "Permanent Marker",
    fontSize: "80px",
    color: fontColor
  },
  typography2: {
    fontFamily: "Permanent Marker",
    fontSize: "60px",
    color: fontColor
  },
  icon: {
    fontSize: "120px",
    alignSelf: "flex-end",
    marginBottom: "-0.065em",
    position: "relative"
  },
  shadow1: {
    left: `${left}px`,
    right: `${right}px`,
    bottom: `${bottom}px`,
    height: "4px",
    position: "absolute",
    boxShadow: "0 0 16px 2px #00000088, 0 0 5px #00000088",
    transformStyle: "preserve-3d",
    borderRadius: "5px"
  },
  shadow2: {
    position: "absolute",
    left: `${left}px`,
    right: `${right}px`,
    bottom: `${bottom}px`,
    height: "20px",
    filter: "blur(5px)",
    backgroundColor: "#00000066",
    transform: "skewX(-40deg) translateX(10px) translateY(0px)"
  },
  clipInFront: {
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
    top: "0",
    clipPath: `polygon(${left}px ${top}px, ${left}px calc(100% - ${bottom}px), calc(100% - ${right}px) calc(100% - ${bottom}px), calc(100% - ${right}px) ${top}px, calc(100% - ${right}px + ${distance}px) ${top}px, calc(100% - ${right}px + ${distance}px) calc(100% - ${bottom}px + ${distance}px), calc(${left}px - ${distance}px) calc(100% - ${bottom}px + ${distance}px), calc(${left}px - ${distance}px) ${top}px)`
  },
  clipBehind: {
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
    top: "0",
    clipPath: `polygon(${left}px ${top}px, ${left}px calc(100% - ${bottom}px), calc(100% - ${right}px) calc(100% - ${bottom}px), calc(100% - ${right}px) ${top}px, calc(100% - ${right}px + ${distance}px) ${top}px, calc(100% - ${right}px + ${distance}px) calc(100% - ${bottom}px + ${distance}px), calc(100% - ${right}px) calc(100% - ${bottom}px), ${left}px calc(100% - ${bottom}px))`
  }
});

export default function Header() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Box className={classes.box} component="header">
        <Typography className={classes.typography} variant="h4" component="h1">
          Emoji
        </Typography>
        <Typography className={classes.typography2} variant="h4" component="h1">
          Industries
        </Typography>
      </Box>
      <Typography className={classes.icon} variant="h4" component="h1">
        🏭
        <Box className={classes.clipInFront}>
          <Box className={classes.shadow1} />
        </Box>
        <Box className={classes.clipBehind}>
          <Box className={classes.shadow2} />
        </Box>
      </Typography>
    </Container>
  );
}
