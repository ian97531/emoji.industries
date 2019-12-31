import React, { useCallback, useEffect } from "react";
import Clipboard from "react-clipboard.js";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { fontColor } from "../constants";

export type Emoji = {
  category: string;
  codepoints: ReadonlyArray<number>;
  name: string;
  familyName: string;
  familyMembers: ReadonlyArray<string>;
};

interface ComponentProps {
  category: string;
  emojis: ReadonlyArray<Emoji>;
}

const selectionSize = 165;

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
    paddingBottom: "27px",
    paddingTop: "27px",
    width: "100%"
  },
  emojiBox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  emoji: {
    background: "none",
    borderRadius: "10px",
    border: "1px solid transparent",
    cursor: "pointer",
    fontSize: "120px",
    height: `${selectionSize}px`,
    lineHeight: `${selectionSize}px`,
    marginBottom: "8px",
    textAlign: "center",
    width: `${selectionSize}px`,
    transition:
      "transform 0.05s ease-in-out, box-shadow 0.05s ease-in-out, border 0.05s ease-in-out",
    boxShadow: "inset 0 0px 0px 0px #00000000, 0px 0px 0px 0px #00000008",
    "&:hover": {
      border: "1px solid #00000012"
    },
    "&:focus": {
      border: "1px solid #00000008",
      boxShadow: "inset 0 0px 60px 10px #00000012, 0px 3px 10px 3px #00000008",
      outline: "none"
    },
    "&:active": {
      boxShadow: "inset 0 0px 60px 10px #0000000B, 0px 0px 2px 0px #00000010",
      transform: "scale(0.98)"
    },
    "&.active": {
      boxShadow: "inset 0 0px 60px 10px #0000000B, 0px 0px 2px 0px #00000010",
      transform: "scale(0.98)"
    }
  }
});

export default function EmojiCategory(props: ComponentProps) {
  const { category, emojis } = props;
  const classes = useStyles();

  const onClickEmoji = useCallback((evt: React.MouseEvent) => {
    if (evt.target instanceof HTMLButtonElement) {
      evt.target.focus();
    }
  }, []);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography
        className={classes.sectionHeader}
        variant="h4"
        component="h2"
        gutterBottom
      >
        {category}
      </Typography>
      <Box className={classes.emojiBox}>
        {Object.entries(emojis).map(([unicode, emoji]) => (
          <Clipboard
            component="button"
            className={classes.emoji}
            data-clipboard-text={String.fromCodePoint(...emoji.codepoints)}
            key={unicode}
            onClick={onClickEmoji}
            title={emoji.name}
          >
            {String.fromCodePoint(...emoji.codepoints)}
          </Clipboard>
        ))}
      </Box>
    </Container>
  );
}
