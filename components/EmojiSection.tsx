import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import clsx from "clsx";
import { useTransition, animated } from "react-spring";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Emoji from "./Emoji";
import Selector from "./Selector";

import { IEmoji } from "../models/emoji/types";

import { copyTextToClipboard } from "../utils/clipboard";
import { clamp } from "../utils/math";

interface ComponentProps {
  category: string;
  emojis: ReadonlyArray<IEmoji>;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "50px",
  },
  sticky: {
    backgroundColor: "var(--background-transparent)",
    backdropFilter: "blur(15px)",
    borderBottom: "1px solid var(--border-transparent)",
    boxShadow: "0px 0px 0px var(--shadow-25)",
    position: "sticky",
    top: "-1px",
    transformStyle: "preserve-3d",
    transform: "translateZ(0px)",
    transition:
      "box-shadow 0.15s ease-in-out, border-bottom 0.15s ease-in-out, background-color 0.15s ease-in-out",
    width: "100%",
    zIndex: 1,
    "& .controls": {
      opacity: 0,
      transition: "opacity 0.1s ease-in-out",
      fontStyle: "unset",
      pointerEvents: "none",
    },
  },
  stuck: {
    backgroundColor: "var(--shadow-25)",
    borderBottom: "1px solid var(--border-visible)",
    boxShadow: "0px 4px 8px var(--shadow-25)",

    transform: "translateZ(200px)",
    zIndex: 100,
    "& .controls": {
      opacity: 1,
      pointerEvents: "all",
    },
  },
  headerBorder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "15px",
    width: "100%",
  },
  sectionHeader: {
    fontFamily: "Lato",
    fontWeight: 300,
    fontSize: "36px",
    fontStyle: "Italic",
    color: "var(--text-primary)",
    paddingBottom: "10px",
  },
  industryIcon: {
    marginRight: "17px",
    paddingRight: "15px",
    paddingLeft: "15px",
  },
  emojiBox: {
    marginLeft: "-27px",
    marginRight: "-28px",
    "@media only screen and (max-device-width: 768px)": {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  display: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    position: "relative",
  },
  divider: {
    borderBottom: "1px solid var(--text-primary)",
    marginBottom: "30px",
  },
  toastList: {
    bottom: 0,
    left: 0,
    right: 0,
    position: "fixed",
    margin: 0,
    width: "100%",
    pointerEvents: "none",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "20px",
    paddingLeft: 0,
    height: "50px",
    zIndex: 90,
    transformStyle: "preserve-3d",
    transform: "translate3d(0, 0, 100px)",
  },
  toast: {
    alignItems: "center",
    backgroundColor: "var(--selection-DD)",
    backdropFilter: "blur(5px)",
    borderBottom: "1px solid var(--border)",
    boxShadow: "0 3px 10px var(--shadow-18)",
    display: "flex",
    color: "var(--text-primary)",
    fontSize: "18px",
    padding: "10px",
    paddingLeft: "25px",
    paddingRight: "25px",
    borderRadius: "30px",
    marginBottom: "15px",
    position: "absolute",
    "& span": {
      fontFamily: '"Lato", sans-serif',
      fontWeight: 300,
      fontSize: "18px",
      marginLeft: "6px",
    },
  },
});

export default function EmojiSection(props: ComponentProps) {
  const { category, emojis } = props;
  const classes = useStyles();

  const boxRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHeaderStuck, setIsHeaderStuck] = useState(false);

  const [focusEmojiCodepoints, setFocusEmojiCodepoints] = useState("");
  const focusEmojiCodepointsRef = useRef(focusEmojiCodepoints);
  focusEmojiCodepointsRef.current = focusEmojiCodepoints;
  const [focusEmojiLeft, setFocusEmojiLeft] = useState(0);
  const [focusEmojiTop, setFocusEmojiTop] = useState(0);
  const [focusEmojiWidth, setFocusEmojiWidth] = useState(0);
  const [focusEmojiHeight, setFocusEmojiHeight] = useState(0);

  const [activeEmojiCodepoints, setActiveEmojiCodepoints] = useState("");
  const [mouseDown, setMouseDown] = useState(false);
  const [isUsingMouse, setIsUsingMouse] = useState(false);

  const [boxWidth, setBoxWidth] = useState(0);

  const [toast, setToast] = useState<ReadonlyArray<string>>([]);
  const [toastTimer, setToastTimer] = useState<number | undefined>(undefined);

  const transitions = useTransition(toast, {
    from: { transform: "translate3d(0,100px,0) scale(0)" },
    enter: { transform: "translate3d(0,0px,0) scale(1)" },
    leave: { transform: "translate3d(0,100,0) scale(0)" },
    config: { mass: 0.9, tension: 250, friction: 20 },
  });

  const updateBoxWidth = useCallback(() => {
    if (boxRef.current instanceof HTMLDivElement) {
      const { width } = boxRef.current.getBoundingClientRect();
      if (width !== boxWidth) {
        setBoxWidth(width);
      }
    }
  }, [setBoxWidth]);

  const displayToast = useCallback(
    (emoji: string) => {
      if (toastTimer !== undefined) {
        clearTimeout(toastTimer);
      }
      setToast([emoji]);
      setToastTimer(window.setTimeout(() => setToast([]), 2000));
    },
    [setToast, setToastTimer, toastTimer]
  );

  const copyActiveEmojiToClipboard = useCallback(() => {
    const codepoints = activeEmojiCodepoints
      ?.split(",")
      .map((codepoint) => parseInt(codepoint, 10));
    if (codepoints && codepoints.length) {
      const emoji = String.fromCodePoint(...codepoints);
      copyTextToClipboard(emoji);
      displayToast(emoji);
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
      setFocusEmojiCodepoints,
    ]
  );

  const removeSectionFocus = useCallback(() => {
    if (focusEmojiCodepointsRef.current === "") {
      setFocusEmojiWidth(0);
      setFocusEmojiHeight(0);
    }
  }, [focusEmojiCodepointsRef, setFocusEmojiWidth, setFocusEmojiHeight]);

  const blurEmoji = useCallback(
    (evt: React.FocusEvent<HTMLButtonElement>) => {
      setFocusEmojiCodepoints("");
      setTimeout(removeSectionFocus, 100);
    },
    [removeSectionFocus, setFocusEmojiCodepoints]
  );

  const focusPreviousEmoji = (
    currentElement: HTMLElement,
    firstInSection = false
  ) => {
    const { previousElementSibling: prevSibling } = currentElement;
    if (prevSibling && prevSibling instanceof HTMLElement) {
      if (firstInSection) {
        if (
          currentElement.parentNode &&
          currentElement.parentNode.firstChild instanceof HTMLElement
        ) {
          currentElement.parentNode.firstChild.focus();
          return true;
        }
      } else {
        prevSibling.focus();
        return true;
      }
    } else {
      const prevEls = Array.from(
        document.querySelectorAll('.emoji[tabindex="0"]')
      );
      const currentIndex = prevEls.indexOf(currentElement);
      if (currentIndex !== -1) {
        const prevSection =
          prevEls[clamp(currentIndex - 1, 0, prevEls.length - 1)];
        if (prevSection instanceof HTMLElement) {
          if (firstInSection) {
            if (
              prevSection.parentNode &&
              prevSection.parentNode.firstChild instanceof HTMLElement
            ) {
              prevSection.parentNode.firstChild.focus();
              return true;
            }
          } else {
            prevSection.focus();
            return true;
          }
        }
      }
    }
    return false;
  };

  const focusNextEmoji = (currentElement: HTMLElement) => {
    const { nextElementSibling: nextSibling } = currentElement;
    if (nextSibling && nextSibling instanceof HTMLElement) {
      nextSibling.focus();
      return true;
    } else {
      const nextEls = Array.from(
        document.querySelectorAll('.emoji[tabindex="0"]')
      );
      const currentIndex = nextEls.indexOf(currentElement);
      if (currentIndex !== -1) {
        const nextSelection =
          nextEls[clamp(currentIndex + 1, 0, nextEls.length - 1)];
        if (nextSelection instanceof HTMLElement) {
          nextSelection.focus();
          return true;
        }
      }
    }
    return false;
  };

  const onKeyDown = useCallback(
    (evt: React.KeyboardEvent) => {
      const { target } = evt;
      if (target && target instanceof HTMLElement) {
        const {
          nextElementSibling: nextSibling,
          offsetLeft: left,
          offsetTop: top,
          previousElementSibling: prevSibling,
        } = target;

        switch (evt.key) {
          case " ":
          case "Enter":
            setMouseDown(true);
            setActiveEmojiCodepoints(target.dataset.codepoints || "");
            break;
          case "ArrowDown":
            setIsUsingMouse(false);
            if (evt.shiftKey) {
              const lastInSection = target.parentElement?.lastChild;
              if (lastInSection && lastInSection instanceof HTMLElement) {
                if (!focusNextEmoji(lastInSection)) {
                  lastInSection.focus();
                }
                evt.preventDefault();
                evt.stopPropagation();
              }
            } else if (nextSibling) {
              let nextTarget = nextSibling;
              while (
                nextTarget &&
                nextTarget instanceof HTMLElement &&
                (nextTarget.offsetTop === top || nextTarget.offsetLeft < left)
              ) {
                if (nextTarget.nextElementSibling) {
                  nextTarget = nextTarget.nextElementSibling;
                } else {
                  break;
                }
              }
              if (nextTarget && nextTarget instanceof HTMLElement) {
                nextTarget.focus();
                evt.preventDefault();
                evt.stopPropagation();
              }
            } else if (focusNextEmoji(target)) {
              evt.preventDefault();
              evt.stopPropagation();
            }

            break;
          case "ArrowUp":
            setIsUsingMouse(false);
            if (evt.shiftKey) {
              const firstInSection = target.parentElement?.firstChild;
              if (firstInSection && firstInSection instanceof HTMLElement) {
                if (firstInSection === target) {
                  if (!focusPreviousEmoji(firstInSection, true)) {
                    firstInSection.focus();
                  }
                } else {
                  firstInSection.focus();
                }
                evt.preventDefault();
                evt.stopPropagation();
              }
            } else if (prevSibling) {
              let prevTarget = prevSibling;
              while (
                prevTarget &&
                prevTarget instanceof HTMLElement &&
                (prevTarget.offsetTop === top || prevTarget.offsetLeft > left)
              ) {
                if (prevTarget.previousElementSibling) {
                  prevTarget = prevTarget.previousElementSibling;
                } else {
                  break;
                }
              }
              if (prevTarget && prevTarget instanceof HTMLElement) {
                prevTarget.focus();
                evt.preventDefault();
                evt.stopPropagation();
              }
            } else if (focusPreviousEmoji(target)) {
              evt.preventDefault();
              evt.stopPropagation();
            }
            break;
          case "ArrowRight":
            setIsUsingMouse(false);
            if (focusNextEmoji(target)) {
              evt.preventDefault();
              evt.stopPropagation();
            }
            break;
          case "ArrowLeft":
            setIsUsingMouse(false);
            if (focusPreviousEmoji(target)) {
              evt.preventDefault();
              evt.stopPropagation();
            }
            break;
          case "Tab":
            setIsUsingMouse(false);
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
        if (document.activeElement !== evt.target) {
          evt.target.focus();
        }
        setActiveEmojiCodepoints(evt.target.dataset.codepoints || "");
      }
      setMouseDown(true);
    },
    [setActiveEmojiCodepoints, setMouseDown]
  );

  const onMouseEnter = useCallback(
    (evt: React.MouseEvent) => {
      if (
        isUsingMouse &&
        !mouseDown &&
        evt.target &&
        evt.target instanceof HTMLElement
      ) {
        evt.target.focus();
      }
    },
    [mouseDown, isUsingMouse]
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
      copyActiveEmojiToClipboard,
    ]
  );

  const onTouchStart = useCallback((evt: React.TouchEvent) => {
    if (evt.target instanceof HTMLElement) {
      setActiveEmojiCodepoints(evt.target.dataset.codepoints || "");
      evt.preventDefault();
      evt.stopPropagation();
    }
  }, []);

  const onTouchMove = useCallback((evt: React.TouchEvent) => {
    if (evt.target instanceof HTMLElement) {
      setActiveEmojiCodepoints("");
    }
  }, []);

  const onTouchEnd = useCallback(
    (evt: React.TouchEvent) => {
      if (activeEmojiCodepoints) {
        copyActiveEmojiToClipboard();
        setActiveEmojiCodepoints("");
      }
    },
    [
      activeEmojiCodepoints,
      setActiveEmojiCodepoints,
      setMouseDown,
      copyActiveEmojiToClipboard,
    ]
  );

  const onWindowResize = useCallback(() => {
    updateBoxWidth();
    setFocusEmojiWidth(0);
    setFocusEmojiHeight(0);
  }, []);

  const checkForStuckHeader = useCallback(
    ([entry]: ReadonlyArray<IntersectionObserverEntry>) => {
      setIsHeaderStuck(
        entry.intersectionRatio < 1 && entry.intersectionRatio > 0
      );
    },
    []
  );

  const setUsingMouse = useCallback(
    (evt: MouseEvent) => {
      if (!isUsingMouse && (evt.movementX || evt.movementY)) {
        setIsUsingMouse(true);
        if (
          evt.target instanceof HTMLElement &&
          evt.target.dataset.codepoints
        ) {
          evt.target.focus();
        }
      }
    },
    [setIsUsingMouse]
  );

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", setUsingMouse);
    updateBoxWidth();
    const headerObserver = new IntersectionObserver(checkForStuckHeader, {
      threshold: [1],
    });
    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", setUsingMouse);
      headerObserver.disconnect();
    };
  });

  const displayEmojiEls = useMemo(
    () =>
      emojis.map((emoji) => (
        <Emoji
          category={emoji.category}
          codepoints={emoji.codepoints}
          className="emoji"
          data-codepoints={emoji.codepoints}
          key={emoji.name}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onFocus={setFocusEmoji}
          onBlur={blurEmoji}
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
      setFocusEmoji,
    ]
  );

  const selectionEmojiEls = useMemo(() => {
    return emojis.map((emoji) => (
      <Emoji
        category={emoji.category}
        codepoints={emoji.codepoints}
        key={emoji.name}
        tabIndex={-1}
        title={emoji.name}
      />
    ));
  }, [emojis]);

  if (emojis.length) {
    return (
      <div>
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
                aria-hidden={!isHeaderStuck}
                tabIndex={isHeaderStuck ? 0 : -1}
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
        <Container maxWidth="md">
          <Box className={classes.divider}></Box>
        </Container>
        <ul className={classes.toastList}>
          {transitions((style, item) => (
            <animated.li style={style} className={classes.toast} role="alert">
              {item} <span>was copied to your clipboard</span>
            </animated.li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
