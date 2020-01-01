import React from "react";

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
