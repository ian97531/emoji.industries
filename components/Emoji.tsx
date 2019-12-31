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

const useStyles = makeStyles({
  emoji: {
    background: "none",
    borderRadius: "10px",
    border: "1px solid transparent",
    cursor: "pointer",
    fontSize: "120px",
    height: `${emojiSize}px`,
    lineHeight: `${emojiSize}px`,
    marginBottom: "8px",
    overflow: "hidden",
    position: "relative",
    textAlign: "center",
    transformOrigin: "center",
    width: `${emojiSize}px`,
    transformStyle: "preserve-3d",
    userSelect: "none",
    outline: "none"
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
