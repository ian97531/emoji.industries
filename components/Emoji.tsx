import React, { useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { OS } from "../models/types";

export interface ComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  category: string;
  codepoints: ReadonlyArray<number>;
  os: OS;
  title: string;
}

const emojiSize = 165;
const tabletEmojiSize = 140;
const mobileEmojiSize = 100;
const padding = 10;

const useStyles = makeStyles({
  emoji: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "120px",
    height: `${emojiSize + padding}px`,
    marginBottom: "8px",
    paddingTop: `${padding}px`,
    textAlign: "center",
    width: `${emojiSize}px`,
    userSelect: "none",
    outline: "none",
    "&::-moz-focus-inner": {
      border: 0,
    },
    "@media only screen and (max-device-width: 480px)": {
      fontSize: "80px",
      paddingRight: `${padding}px`,
      paddingLeft: `${padding}px`,
      paddingTop: 0,
      marginTop: `${padding}px`,
      height: `${mobileEmojiSize}px`,
      width: `${mobileEmojiSize}px`,
    },
    "@media only screen and (min-device-width: 481px) and (max-device-width: 768px)": {
      fontSize: "100px",
      paddingRight: `${padding}px`,
      paddingLeft: `${padding}px`,
      paddingTop: 0,
      marginTop: `${padding}px`,
      height: `${tabletEmojiSize}px`,
      width: `${tabletEmojiSize}px`,
    },
  },
  windows: {
    fontSize: "100px",
    lineHeight: "100px",
    paddingTop: 0,
  },
});

export default function Emoji(props: ComponentProps) {
  const { category, className, codepoints, os, title, ...buttonProps } = props;
  const classes = useStyles();

  return (
    <button
      {...buttonProps}
      className={clsx(
        classes.emoji,
        className,
        os === "windows" && classes.windows
      )}
      title={title}
    >
      {String.fromCodePoint(...codepoints)}
    </button>
  );
}
