import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo
} from "react";
import { useToasts } from "react-toast-notifications";
import clsx from "clsx";
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
    flexDirection: "column"
  },
  sticky: {
    backgroundColor: "#FFFFFF00",
    backdropFilter: "blur(3px)",
    borderBottom: "1px solid #0000",
    boxShadow: "0 0 0 #0000",
    marginTop: "60px",
    position: "sticky",
    top: "-20px",
    transformStyle: "preserve-3d",
    transform: "translateZ(200px)",
    transition: "border-bottom 0.1s ease-in-out",
    width: "100%",
    zIndex: 100,
    "& .controls": {
      opacity: 0,
      transition: "opacity 0.1s ease-in-out",
      fontStyle: "unset",
      pointerEvents: "none"
    }
  },
  stuck: {
    backgroundColor: "#FFFFFFDD",
    borderBottom: "1px solid #DDDF",
    "& .controls": {
      opacity: 1,
      pointerEvents: "all"
    }
  },
  headerBorder: {
    borderTop: `1px solid ${fontColor}`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "35px",
    width: "100%"
  },
  sectionHeader: {
    fontFamily: "Lato",
    fontWeight: 300,
    fontSize: "40px",
    fontStyle: "Italic",
    color: fontColor,
    paddingBottom: "10px"
  },
  industryIcon: {
    marginRight: "17px",
    paddingRight: "15px",
    paddingLeft: "15px"
  },
  emojiBox: {
    marginLeft: "-27px",
    marginRight: "-28px"
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
  const { addToast, removeToast } = useToasts();

  const boxRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHeaderStuck, setIsHeaderStuck] = useState(false);
  const [focusEmojiCodepoints, setFocusEmojiCodepoints] = useState("");
  const [focusEmojiLeft, setFocusEmojiLeft] = useState(0);
  const [focusEmojiTop, setFocusEmojiTop] = useState(0);
  const [focusEmojiWidth, setFocusEmojiWidth] = useState(0);
  const [focusEmojiHeight, setFocusEmojiHeight] = useState(0);

  const [activeEmojiCodepoints, setActiveEmojiCodepoints] = useState("");
  const [mouseDown, setMouseDown] = useState(false);

  const [boxWidth, setBoxWidth] = useState(0);

  const updateBoxWidth = useCallback(() => {
    if (boxRef.current instanceof HTMLDivElement) {
      const { width } = boxRef.current.getBoundingClientRect();
      if (width !== boxWidth) {
        setBoxWidth(width);
      }
    }
  }, [setBoxWidth]);

  const copyActiveEmojiToClipboard = useCallback(() => {
    const codepoints = activeEmojiCodepoints
      ?.split(",")
      .map(codepoint => parseInt(codepoint, 10));
    if (codepoints && codepoints.length) {
      const emoji = String.fromCodePoint(...codepoints);
      copyTextToClipboard(emoji);
      // addToast(`${emoji} was copied to your clipboard`, {
      //   appearance: "success",
      //   autoDismiss: true
      // });
    }
  }, [activeEmojiCodepoints, copyTextToClipboard]);

  const setFocusEmoji = useCallback(
    (evt: React.FocusEvent<HTMLButtonElement>) => {
      if (evt.target && evt.target instanceof HTMLButtonElement) {
        const { width, height } = evt.target.getBoundingClientRect();
        setFocusEmojiWidth(width);
        setFocusEmojiHeight(height);
        setFocusEmojiLeft(evt.target.offsetLeft);
        setFocusEmojiTop(evt.target.offsetTop);
        setFocusEmojiCodepoints(evt.target.dataset.codepoints || "");
      }
    },
    [
      setFocusEmojiWidth,
      setFocusEmojiHeight,
      setFocusEmojiLeft,
      setFocusEmojiTop,
      setFocusEmojiCodepoints
    ]
  );

  const onKeyDown = useCallback(
    (evt: React.KeyboardEvent) => {
      const { target } = evt;
      if (target && target instanceof HTMLElement) {
        const {
          nextElementSibling: nextSibling,
          offsetLeft: left,
          previousElementSibling: prevSibling
        } = target;

        switch (evt.key) {
          case " ":
          case "Enter":
            setActiveEmojiCodepoints(target.dataset.codepoints || "");
            setMouseDown(true);

            break;
          case "ArrowDown":
            let nextTarget = nextSibling;
            while (
              nextTarget &&
              nextTarget instanceof HTMLElement &&
              nextTarget.offsetLeft !== left
            ) {
              nextTarget = nextTarget.nextElementSibling;
            }
            if (nextTarget && nextTarget instanceof HTMLElement) {
              nextTarget.focus();
            }
            evt.preventDefault();
            evt.stopPropagation();
            break;
          case "ArrowUp":
            let prevTarget = prevSibling;
            while (
              prevTarget &&
              prevTarget instanceof HTMLElement &&
              prevTarget.offsetLeft !== left
            ) {
              prevTarget = prevTarget.previousElementSibling;
            }
            if (prevTarget && prevTarget instanceof HTMLElement) {
              prevTarget.focus();
            }
            evt.preventDefault();
            evt.stopPropagation();
            break;
          case "ArrowRight":
            if (nextSibling && nextSibling instanceof HTMLElement) {
              nextSibling.focus();
              evt.preventDefault();
              evt.stopPropagation();
            }
            break;
          case "ArrowLeft":
            if (prevSibling && prevSibling instanceof HTMLElement) {
              prevSibling.focus();
              evt.preventDefault();
              evt.stopPropagation();
            }
            break;
          default:
            break;
        }
      }
    },
    [setActiveEmojiCodepoints, setMouseDown]
  );

  const onKeyUp = useCallback(
    (evt: React.KeyboardEvent) => {
      if (
        (evt.key === " " || evt.key === "Enter") &&
        evt.target instanceof HTMLElement
      ) {
        copyActiveEmojiToClipboard();
        setActiveEmojiCodepoints("");
        evt.target.focus();
        setMouseDown(false);
      }
    },
    [setActiveEmojiCodepoints, copyActiveEmojiToClipboard, setMouseDown]
  );

  const onMouseDown = useCallback(
    (evt: React.MouseEvent) => {
      if (evt.target instanceof HTMLElement) {
        setActiveEmojiCodepoints(evt.target.dataset.codepoints || "");
      }
      setMouseDown(true);
    },
    [setActiveEmojiCodepoints, setMouseDown]
  );

  const onMouseEnter = useCallback(
    (evt: React.MouseEvent) => {
      if (!mouseDown && evt.target && evt.target instanceof HTMLElement) {
        evt.target.focus();
      }
    },
    [mouseDown]
  );

  const onMouseLeave = useCallback(() => {
    if (mouseDown) {
      setActiveEmojiCodepoints("");
    }
  }, [mouseDown, setActiveEmojiCodepoints]);

  const onMouseUp = useCallback(
    (evt: MouseEvent) => {
      setMouseDown(false);
      if (evt.target instanceof HTMLElement) {
        if (
          activeEmojiCodepoints &&
          activeEmojiCodepoints === focusEmojiCodepoints
        ) {
          copyActiveEmojiToClipboard();
        }

        if (evt.target.dataset.codepoints) {
          evt.target.focus();
        }
      }

      if (activeEmojiCodepoints) {
        setActiveEmojiCodepoints("");
      }
    },
    [
      activeEmojiCodepoints,
      setActiveEmojiCodepoints,
      setMouseDown,
      copyActiveEmojiToClipboard
    ]
  );

  const onWindowResize = useCallback(() => {
    updateBoxWidth();
    setFocusEmojiWidth(0);
    setFocusEmojiHeight(0);
  }, []);

  const checkForStuckHeader = useCallback(
    ([entry]: ReadonlyArray<IntersectionObserverEntry>) => {
      setIsHeaderStuck(!entry.isIntersecting);
    },
    []
  );

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mouseup", onMouseUp);
    updateBoxWidth();
    const headerObserver = new IntersectionObserver(checkForStuckHeader, {
      threshold: [0.9]
    });
    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mouseup", onMouseUp);
      headerObserver.disconnect();
    };
  });

  const displayEmojiEls = useMemo(
    () =>
      emojis.map(emoji => (
        <Emoji
          category={emoji.category}
          codepoints={emoji.codepoints}
          data-codepoints={emoji.codepoints}
          key={emoji.name}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={setFocusEmoji}
          tabIndex={0}
          title={emoji.name}
        />
      )),
    [
      emojis,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      setFocusEmoji
    ]
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
    <React.Fragment>
      <div
        className={clsx(classes.sticky, isHeaderStuck && classes.stuck)}
        ref={headerRef}
      >
        <Container maxWidth="md">
          <div className={classes.headerBorder}>
            <Typography
              className={classes.sectionHeader}
              variant="h4"
              component="h2"
            >
              {category}
            </Typography>
            <a
              className={clsx(
                classes.sectionHeader,
                classes.industryIcon,
                "controls"
              )}
              href="#top"
            >
              🏭
            </a>
          </div>
        </Container>
      </div>
      <Container maxWidth="md" className={classes.container}>
        <Box className={classes.emojiBox}>
          <Selector
            top={focusEmojiTop}
            left={focusEmojiLeft}
            width={focusEmojiWidth}
            height={focusEmojiHeight}
            selectionActive={mouseDown}
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
    </React.Fragment>
  );
}
