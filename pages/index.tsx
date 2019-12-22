import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import Header from "../components/Header";

import emojis from "../data/emoji.json";

import { fontColor } from "../constants";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "30px"
  },
  sectionHeader: {
    fontFamily: "Lato",
    fontWeight: 300,
    fontStyle: "Italic",
    color: fontColor,
    borderTop: `1px solid ${fontColor}`,
    paddingTop: "27px",
    width: "100%"
  },
  emojiBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: "-5px",
    marginRight: "-43px"
  },
  emoji: {
    fontSize: "120px",
    width: "calc(100% / 6)",
    minWidth: "140px",
    textAlign: "left",
    cursor: "pointer"
  }
});

export default function Index() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header></Header>
      <Container maxWidth="md" className={classes.container}>
        <Typography
          className={classes.sectionHeader}
          variant="h4"
          component="h2"
          gutterBottom
        >
          Smileys & People
        </Typography>
        <Box className={classes.emojiBox}>
          {Object.entries(emojis).map(([unicode, emoji]) => (
            <Typography
              key={unicode}
              className={classes.emoji}
              title={emoji.name}
            >
              {String.fromCodePoint(...emoji.codepoints)}
            </Typography>
          ))}
        </Box>
      </Container>
      <Container maxWidth="md" className={classes.container}>
        <Typography
          className={classes.sectionHeader}
          variant="h4"
          component="h2"
          gutterBottom
        >
          Animals & Nature
        </Typography>
        <Box className={classes.emojiBox}></Box>
      </Container>
    </React.Fragment>
  );
}
