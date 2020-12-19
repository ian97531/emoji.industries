import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { OS } from "../models/types";

const left = 3.3;
const right = 5.5;
const bottom = 20;
const top = 0;
const distance = 500;

type ComponentProps = {
  os: OS;
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
    paddingTop: "60px",
    "@media only screen and (max-device-width: 480px)": {
      paddingTop: "40px",
    },
    "@media only screen and (min-device-width: 481px) and (max-device-width: 768px)": {
      paddingTop: "50px",
    },
  },
  box: {
    display: "flex",
    flexDirection: "column",
  },
  typography: {
    fontFamily: "Permanent Marker",
    fontSize: "90px",
    color: "var(--text-primary)",
    "@media only screen and (max-device-width: 480px)": {
      fontSize: "60px",
    },
    "@media only screen and (min-device-width: 481px) and (max-device-width: 768px)": {
      fontSize: "75px",
    },
  },
  typography2: {
    fontFamily: "Permanent Marker",
    fontSize: "70px",
    color: "var(--text-primary)",
    "@media only screen and (max-device-width: 480px)": {
      fontSize: "40px",
    },
    "@media only screen and (min-device-width: 481px) and (max-device-width: 768px)": {
      fontSize: "55px",
    },
  },
  icon: {
    fontSize: "120px",
    alignSelf: "flex-end",
    marginBottom: "-0.065em",
    position: "relative",
    "@media only screen and (max-device-width: 480px)": {
      fontSize: "80px",
    },
  },
  shadow1: {
    left: `${left}px`,
    right: `${right}px`,
    bottom: `${bottom}px`,
    height: "4px",
    position: "absolute",
    boxShadow: "0 0 16px 2px var(--shadow-88), 0 0 5px var(--shadow-88)",
    transformStyle: "preserve-3d",
    borderRadius: "5px",
  },
  shadow2: {
    position: "absolute",
    left: `${left}px`,
    right: `${right}px`,
    bottom: `${bottom}px`,
    height: "20px",
    filter: "blur(5px)",
    backgroundColor: "var(--shadow-66)",
    transform: "skewX(-40deg) translateX(10px) translateY(0px)",
  },
  clipInFront: {
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
    top: "0",
    "--webkit-clip-path": `polygon(${left}px ${top}px, ${left}px calc(100% - ${bottom}px), calc(100% - ${right}px) calc(100% - ${bottom}px), calc(100% - ${right}px) ${top}px, calc(100% - ${right}px + ${distance}px) ${top}px, calc(100% - ${right}px + ${distance}px) calc(100% - ${bottom}px + ${distance}px), calc(${left}px - ${distance}px) calc(100% - ${bottom}px + ${distance}px), calc(${left}px - ${distance}px) ${top}px)`,
    clipPath: `polygon(${left}px ${top}px, ${left}px calc(100% - ${bottom}px), calc(100% - ${right}px) calc(100% - ${bottom}px), calc(100% - ${right}px) ${top}px, calc(100% - ${right}px + ${distance}px) ${top}px, calc(100% - ${right}px + ${distance}px) calc(100% - ${bottom}px + ${distance}px), calc(${left}px - ${distance}px) calc(100% - ${bottom}px + ${distance}px), calc(${left}px - ${distance}px) ${top}px)`,
    zIndex: -10,
    display: "none",
    "@media screen and (-webkit-min-device-pixel-ratio:0) and (min-resolution:.001dpcm)": {
      display: "block",
    },
  },
  clipBehind: {
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
    top: "0",
    "--webkit-clip-path": `polygon(${left}px ${top}px, ${left}px calc(100% - ${bottom}px), calc(100% - ${right}px) calc(100% - ${bottom}px), calc(100% - ${right}px) ${top}px, calc(100% - ${right}px + ${distance}px) ${top}px, calc(100% - ${right}px + ${distance}px) calc(100% - ${bottom}px + ${distance}px), calc(100% - ${right}px) calc(100% - ${bottom}px), ${left}px calc(100% - ${bottom}px))`,
    clipPath: `polygon(${left}px ${top}px, ${left}px calc(100% - ${bottom}px), calc(100% - ${right}px) calc(100% - ${bottom}px), calc(100% - ${right}px) ${top}px, calc(100% - ${right}px + ${distance}px) ${top}px, calc(100% - ${right}px + ${distance}px) calc(100% - ${bottom}px + ${distance}px), calc(100% - ${right}px) calc(100% - ${bottom}px), ${left}px calc(100% - ${bottom}px))`,
    zIndex: -10,
    "@media (max-device-width: 768px)": {
      transform: "translateY(6px)",
    },
  },
});

export default function Header({ os }: ComponentProps) {
  const classes = useStyles();
  const iconBackground =
    os === "mac" ? (
      <>
        <Box className={clsx(classes.clipInFront, "ff-adjust-up")}>
          <Box className={classes.shadow1} />
        </Box>
        <Box className={clsx(classes.clipBehind, "ff-adjust-up")}>
          <Box className={classes.shadow2} />
        </Box>
      </>
    ) : null;
  return (
    <Container maxWidth="md" className={classes.container} id="top">
      <Box className={classes.box} component="header">
        <Typography className={classes.typography} variant="h4" component="h1">
          Emoji
        </Typography>
        <Typography className={classes.typography2} variant="h4" component="h1">
          Industries
        </Typography>
      </Box>
      <Typography
        className={clsx(classes.icon, "ff-adjust-down")}
        variant="h4"
        component="h1"
      >
        🏭
        {iconBackground}
      </Typography>
    </Container>
  );
}
