import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import Emoji from "../components/Emoji";
import Header from "../components/Header";

import categories from "../data/categories.json";
import emojis from "../data/familiedEmoji.json";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "30px"
  }
});

export default function Index() {
  const classes = useStyles();
  const emoji = Object.values(emojis)[0];
  return (
    <React.Fragment>
      <Header></Header>
      <Container maxWidth="md" className={classes.container}>
        <Emoji
          category={emoji.category}
          codepoints={emoji.codepoints}
          name={emoji.name}
        />
      </Container>
    </React.Fragment>
  );
}
