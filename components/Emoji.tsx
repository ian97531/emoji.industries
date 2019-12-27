import React, { useCallback, useEffect, useRef, useState } from "react";
import Clipboard from "react-clipboard.js";
import { makeStyles } from "@material-ui/core/styles";

import { clamp } from "../utils/math";

export type Emoji = {
  category: string;
  codepoints: ReadonlyArray<number>;
  name: string;
  familyName: string;
  familyMembers: ReadonlyArray<string>;
};

interface ComponentProps {
  category: string;
  codepoints: ReadonlyArray<number>;
  name: string;
}

const selectionSize = 165;
const shineSize = 165;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "30px"
  },
  emoji: {
    background: "none",
    border: "none",
    height: `${selectionSize}px`,
    width: `${selectionSize}px`,
    "& > div": {
      background: "none",
      borderRadius: "10px",
      border: "1px solid transparent",
      cursor: "pointer",
      fontSize: "120px",
      height: `${selectionSize}px`,
      lineHeight: `${selectionSize}px`,
      marginBottom: "8px",
      overflow: "hidden",
      position: "relative",
      textAlign: "center",
      transformOrigin: "center",
      width: `${selectionSize}px`,
      transition:
        "transform 0.05s ease-in-out, box-shadow 0.05s ease-in-out, border 0.05s ease-in-out",
      boxShadow: "inset 0 0px 0px 0px #00000000, 0px 0px 0px 0px #00000008"
    },
    "&:hover > div": {
      border: "1px solid #00000012"
    },
    "&:focus": {
      outline: "none"
    },
    "&:focus > div": {
      border: "1px solid #00000008",
      boxShadow: "inset 0 0px 60px 10px #00000012, 0px 3px 10px 3px #00000008"
    },
    "&:active > div": {
      boxShadow: "inset 0 0px 60px 10px #0000000B, 0px 0px 2px 0px #00000010",
      transform: "scale(0.985) translateY(2px) rotateX(0) rotateY(0)"
    }
  },
  shine: {
    position: "absolute",
    borderRadius: `${shineSize / 2}px`,
    width: `${shineSize}px`,
    height: `${shineSize}px`,
    filter: "blur(30px)",
    transition: "background-color 0.05s ease-in-out"
  }
});

export default function Header(props: ComponentProps) {
  const { codepoints, name } = props;
  const classes = useStyles();

  const emojiEl = useRef<HTMLDivElement>(null);
  const [xRotate, setXRotate] = useState(0);
  const [yRotate, setYRotate] = useState(0);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const onClickEmoji = useCallback((evt: React.MouseEvent) => {
    if (evt.currentTarget instanceof HTMLButtonElement) {
      evt.currentTarget.focus();
    }
  }, []);

  const onMouseDown = useCallback((evt: React.MouseEvent) => {
    setMouseDown(true);
  }, []);

  const onMouseUp = useCallback((evt: React.MouseEvent) => {
    setMouseDown(false);
  }, []);

  const trackMouse = useCallback((evt: MouseEvent) => {
    if (emojiEl.current) {
      const { clientX: mouseLeft, clientY: mouseTop } = evt;
      const {
        height: emojiHeight,
        left: emojiLeft,
        top: emojiTop,
        width: emojiWidth
      } = emojiEl.current.getBoundingClientRect();
      const mouseX = clamp(mouseLeft - emojiLeft, 0, emojiWidth);
      const mouseY = clamp(mouseTop - emojiTop, 0, emojiHeight);
      const xRotation = (mouseX * 2) / emojiWidth - 1;
      const yRotation = (mouseY * 2) / emojiHeight - 1;
      const rotationAmount = 5;
      setYRotate(xRotation * rotationAmount);
      setXRotate(yRotation * rotationAmount * -1);
      setXPos(mouseX);
      setYPos(mouseY);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", trackMouse);
    return () => document.removeEventListener("mousemove", trackMouse);
  });

  return (
    <Clipboard
      component="button"
      className={classes.emoji}
      data-clipboard-text={String.fromCodePoint(...codepoints)}
      onClick={onClickEmoji}
      title={name}
    >
      <div
        ref={emojiEl}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={
          mouseDown
            ? {}
            : {
                transition:
                  "box-shadow 0.05s ease-in-out, border 0.05s ease-in-out",
                transform: `perspective(500px) rotateX(${xRotate}deg) rotateY(${yRotate}deg)`
              }
        }
      >
        <div
          className={classes.shine}
          style={{
            transform: `translateX(${xPos -
              shineSize / 2}px) translateY(${yPos - shineSize / 2}px)`,
            backgroundColor: mouseDown ? "#FFFFFF00" : "#FFFFFF22"
          }}
        />

        {String.fromCodePoint(...codepoints)}
      </div>
    </Clipboard>
  );
}
