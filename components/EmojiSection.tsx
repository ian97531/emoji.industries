import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Emoji from "./Emoji";
import Selector from "./Selector";

import { fontColor } from "../constants";

import { IEmoji } from "../models/emoji/types";

import { copyTextToClipboard } from "../utils/clipboard";

interface ComponentProps {
  category: string;
  emojis: ReadonlyArray<IEmoji>;
}

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
  display: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    position: "relative"
  }
});

export default function EmojiSection(props: ComponentProps) {
  const { category, emojis } = props;
  const classes = useStyles();

  const boxRef = useRef<HTMLDivElement>(null);
  const [selectionLeft, setSelectionLeft] = useState(0);
  const [selectionTop, setSelectionTop] = useState(0);
  const [selectionWidth, setSelectionWidth] = useState(0);
  const [selectionHeight, setSelectionHeight] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const [selectionActive, setSelectionActive] = useState(false);

  useEffect(() => {
    if (boxRef.current instanceof HTMLDivElement) {
      const { width } = boxRef.current.getBoundingClientRect();
      setBoxWidth(width);
    }
  });

  const setSelection = useCallback(
    (evt: React.FocusEvent<HTMLButtonElement>) => {
      if (evt.target && evt.target instanceof HTMLButtonElement) {
        const { width, height } = evt.target.getBoundingClientRect();
        setSelectionWidth(width);
        setSelectionHeight(height);
        setSelectionLeft(evt.target.offsetLeft);
        setSelectionTop(evt.target.offsetTop);
      }
    },
    []
  );

  const displayEmojiEls = useMemo(
    () =>
      emojis.map(emoji => (
        <Emoji
          category={emoji.category}
          codepoints={emoji.codepoints}
          key={emoji.name}
          onKeyDown={(evt: React.KeyboardEvent) => {
            if (evt.key === " " || evt.key === "Enter") {
              setSelectionActive(true);
            }
          }}
          onKeyUp={(evt: React.KeyboardEvent) => {
            if (evt.key === " " || evt.key === "Enter") {
              copyTextToClipboard(String.fromCodePoint(...emoji.codepoints));
              setSelectionActive(false);
              if (evt.target && evt.target instanceof HTMLElement) {
                evt.target.focus();
              }
            }
          }}
          onMouseDown={() => {
            setSelectionActive(true);
          }}
          onMouseEnter={(evt: React.MouseEvent) => {
            if (
              !selectionActive &&
              evt.target &&
              evt.target instanceof HTMLElement
            ) {
              evt.target.focus();
            }
          }}
          onMouseLeave={() => {
            if (selectionActive) {
              setSelectionActive(false);
            }
          }}
          onMouseUp={(evt: React.MouseEvent) => {
            if (selectionActive) {
              copyTextToClipboard(String.fromCodePoint(...emoji.codepoints));
              setSelectionActive(false);
              if (evt.target && evt.target instanceof HTMLElement) {
                evt.target.focus();
              }
            }
          }}
          onFocus={setSelection}
          tabIndex={0}
          title={emoji.name}
        />
      )),
    [emojis, selectionActive]
  );

  const selectionEmojiEls = useMemo(() => {
    return emojis.map(emoji => (
      <Emoji
        category={emoji.category}
        codepoints={emoji.codepoints}
        key={emoji.name}
        tabIndex={-1}
        title={emoji.name}
      />
    ));
  }, [emojis]);

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
      <Box>
        <Selector
          top={selectionTop}
          left={selectionLeft}
          width={selectionWidth}
          height={selectionHeight}
          selectionActive={selectionActive}
        >
          <div className={classes.display} style={{ width: boxWidth }}>
            {selectionEmojiEls}
          </div>
        </Selector>
        <div className={classes.display} ref={boxRef}>
          {displayEmojiEls}
        </div>
      </Box>
    </Container>
  );
}
