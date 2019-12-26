import React from "react";
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
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "120px",
    height: `${selectionSize}px`,
    lineHeight: `${selectionSize}px`,
    textAlign: "center",
    width: `${selectionSize}px`,
    transition: "box-shadow 0.3s ease-in-out",
    boxShadow: "inset 0 0px 0px 0px #00000000, 0px 0px 0px 0px #00000008",
    "&:hover": {
      boxShadow: "inset 0 0px 60px 10px #00000012, 0px 3px 10px 3px #00000008"
    }
  }
});

export default function Header(props: ComponentProps) {
  const { category, emojis } = props;
  const classes = useStyles();

  const onClickEmoji = (evt: React.MouseEvent) => {
    if (
      evt.target instanceof HTMLParagraphElement &&
      evt.target.dataset.codepoints
    ) {
      const codepoints = evt.target.dataset.codepoints
        .split(",")
        .map(codepoint => parseInt(codepoint, 10));
      console.log(`click ${String.fromCodePoint(...codepoints)}`);
    }
  };

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
          <Typography
            className={classes.emoji}
            data-codepoints={emoji.codepoints}
            key={unicode}
            onClick={onClickEmoji}
            role="button"
            tabIndex={0}
            title={emoji.name}
          >
            {String.fromCodePoint(...emoji.codepoints)}
          </Typography>
        ))}
      </Box>
    </Container>
  );
}
