import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import EmojiSection from "../components/EmojiSection";
import Header from "../components/Header";

import categories from "../data/categories.json";
import emojis from "../data/familiedEmoji.json";

export default function Index() {
  return (
    <React.Fragment>
      <Header></Header>
      {Object.entries(categories).map(([name, ids]) => (
        <EmojiSection
          category={name}
          emojis={ids
            .map(id => emojis[id as keyof typeof emojis])
            .filter(emoji => emoji.name === emoji.familyName)}
          key={name}
        />
      ))}
    </React.Fragment>
  );
}
