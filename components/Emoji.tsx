import React, { useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

export interface ComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  category: string;
  codepoints: ReadonlyArray<number>;
  title: string;
}

const emojiSize = 165;
const paddingTop = 10;

const useStyles = makeStyles({
  emoji: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "120px",
    height: `${emojiSize + paddingTop}px`,
    marginBottom: "8px",
    paddingTop: `${paddingTop}px`,
    textAlign: "center",
    width: `${emojiSize}px`,
    userSelect: "none",
    outline: "none",
    "&::-moz-focus-inner": {
      border: 0
    }
  }
});

export default function Emoji(props: ComponentProps) {
  const { category, className, codepoints, title, ...buttonProps } = props;
  const classes = useStyles();

  return (
    <button
      {...buttonProps}
      className={clsx(classes.emoji, className)}
      title={title}
    >
      {String.fromCodePoint(...codepoints)}
    </button>
  );
}
