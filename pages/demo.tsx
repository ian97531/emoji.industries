import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import EmojiSection from "../components/EmojiSection";
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

export default function Demo() {
  const classes = useStyles();
  const emojiCategory = categories["Smileys & People"];
  return (
    <React.Fragment>
      <Header></Header>
      <EmojiSection
        category="Hello"
        emojis={emojiCategory
          .map(id => emojis[id as keyof typeof emojis])
          .filter(emoji => emoji.name === emoji.familyName)}
      ></EmojiSection>
    </React.Fragment>
  );
}
