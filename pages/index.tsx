import React, { useCallback, useState } from "react";
import { GetServerSideProps } from "next";
import Bowser from "bowser";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";

import EmojiSection from "../components/EmojiSection";
import Header from "../components/Header";

import categoriesWindows from "../data/categories-win.json";
import categoriesMac from "../data/categories-mac.json";
import categoriesDefault from "../data/categories.json";
import emojis from "../data/familiedEmoji.json";

import { IEmoji } from "../models/emoji/types";

type IFilteredEmoji = { [key: string]: IEmoji };
type ICategories = { [key: string]: ReadonlyArray<string> };

type ComponentProps = {
  categories: ICategories;
};

const useStyles = makeStyles({
  nav: {
    borderBottom: "1px solid var(--text-primary)",
    height: "50px",
    marginTop: "45px",
    marginBottom: "30px",
    fontFamily: "Lato",
    fontWeight: 300,
    fontSize: "26px",
    paddingLeft: "4px",
    lineHeight: "50px",
    display: "flex",
  },
  searchBox: {
    marginLeft: "10px",
    marginRight: "10px",
    width: "100%",
  },
  searchInput: {
    color: "var(--text-primary)",
    fontStyle: "italic",
    fontFamily: "Lato",
    fontWeight: 300,
    fontSize: "26px",
    "&::placeholder": {
      color: "var(--text-primary-88)",
    },
  },
});

export default function Index({ categories }: ComponentProps) {
  const classes = useStyles();

  const [filteredEmoji, setFilteredEmoji] = useState<IFilteredEmoji>(emojis);

  const searchEmoji = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const searchString = evt.target.value.toLowerCase();
      setFilteredEmoji(
        Object.fromEntries(
          Object.entries(emojis).filter(([id, emoji]) =>
            emoji.name.toLowerCase().includes(searchString)
          )
        )
      );
    },
    [setFilteredEmoji]
  );

  return (
    <React.Fragment>
      <Header></Header>
      <Container maxWidth="md">
        <Box className={classes.nav}>
          🔎{" "}
          <Input
            id="standard-search"
            placeholder="Search for Emoji to Copy"
            type="search"
            disableUnderline
            className={classes.searchBox}
            classes={{ input: classes.searchInput }}
            onChange={searchEmoji}
          />
        </Box>
      </Container>
      {Object.entries(categories).map(([name, ids]) => (
        <EmojiSection
          category={name}
          emojis={ids
            .map((id) => filteredEmoji[id])
            .filter((emoji) => emoji && emoji.name === emoji.familyName)}
          key={name}
        />
      ))}
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<ComponentProps> = async (
  context
) => {
  const ua = context.req.headers["user-agent"];
  if (ua) {
    const os = Bowser.getParser(ua).getOSName(true);
    console.log(os);

    if (os === "macos") {
      return {
        props: {
          categories: categoriesMac,
        },
      };
    }

    if (os === "windows") {
      return {
        props: {
          categories: categoriesWindows,
        },
      };
    }
  }
  return {
    props: {
      categories: categoriesDefault,
    },
  };
};
