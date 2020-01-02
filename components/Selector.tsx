import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactElement
} from "react";
import clsx from "clsx";
import { useSpring, animated, interpolate } from "react-spring";
import { makeStyles } from "@material-ui/core/styles";

import { clamp } from "../utils/math";

interface ComponentProps {
  top: number;
  left: number;
  width: number;
  height: number;
  children: ReactElement;
  selectionActive: boolean;
}

const useStyles = makeStyles({
  selection: {
    background: "var(--selection)",
    borderRadius: "10px",
    boxShadow:
      "inset 0 0px 0px 0px var(--shadow-transparent), 0px 0px 0px 0px var(--shadow-transparent)",
    cursor: "pointer",
    display: "block",
    overflow: "hidden",
    pointerEvents: "none",
    position: "absolute",
    transformOrigin: "center",
    transformStyle: "preserve-3d",
    transition: "box-shadow 0.05s ease-in-out",
    zIndex: 10
  },
  active: {
    boxShadow:
      "inset 0 0px 60px 10px var(--shadow-12), 0px 3px 10px 3px var(--shadow-08)"
  },
  clicked: {
    boxShadow:
      "inset 0 0px 60px 10px var(--shadow-0B), 0px 0px 2px 0px var(--shadow-18)"
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "visible"
  },
  shine: {
    backgroundColor: "var(--highlight-30)",
    position: "absolute",
    borderRadius: "50%",
    width: "100%",
    height: "100%",
    filter: "blur(30px)",
    transition: "background-color 0.1s ease-in-out",
    "&.active": {
      backgroundColor: "var(--highlight-10)"
    }
  }
});

const shineSize = 165;

export default function Selector(props: ComponentProps) {
  const { children, top, left, width, height, selectionActive } = props;
  const classes = useStyles();

  const selectorRef = useRef<HTMLDivElement>(null);
  const [xRotate, setXRotate] = useState(0);
  const [yRotate, setYRotate] = useState(0);
  const [xShine, setXShine] = useState(0);
  const [yShine, setYShine] = useState(0);
  const [scale, setScale] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const positionSpring = useSpring({
    to: { selectorTransform: [top, left] },
    config: { mass: 0.9, tension: 250, friction: 20 },
    immediate: !isVisible,
    onRest: () => {
      if (width && height && !isVisible) {
        setIsVisible(true);
      }
    }
  });

  if ((!width || !height) && isVisible) {
    setIsVisible(false);
  }

  const sizeSpring = useSpring({
    to: { width, height },
    config: { mass: 0.9, tension: 250, friction: 20 }
  });

  const rotationSpring = useSpring({
    to: {
      selectorTransform: selectionActive
        ? [0, 0, 1]
        : [xRotate, yRotate, scale],
      shineTransform: [xShine, yShine]
    },

    config: { mass: 0.2, tension: 800, friction: 30, clamp: true }
  });

  const setFlat = (scale = 1) => {
    setYRotate(0);
    setXRotate(0);
    setXShine(width / 2);
    setYShine(height / 2);
    setScale(scale);
  };

  const trackMouse = useCallback(
    (evt: MouseEvent) => {
      const rotationMultiplier = 10;
      const distanceModifier = 0.03;
      const distanceLimit = 100;
      if (!selectionActive && selectorRef.current && width && height) {
        const { clientX: mouseLeft, clientY: mouseTop } = evt;
        const {
          left: emojiLeft,
          top: emojiTop
        } = selectorRef.current.getBoundingClientRect();
        const mouseX = clamp(mouseLeft - emojiLeft, 0, width);
        const mouseY = clamp(mouseTop - emojiTop, 0, height);
        const centerX = emojiLeft + width / 2;
        const centerY = emojiTop + height / 2;
        const distanceX = Math.abs(mouseLeft - centerX);
        const distanceY = Math.abs(mouseTop - centerY);
        const distance = Math.min(distanceX, distanceY);
        const xRotation = (mouseX * 2) / width - 1;
        const yRotation = (mouseY * 2) / height - 1;
        const scaleAdd =
          distanceModifier * ((distanceLimit - distance) / distanceLimit);

        setYRotate(xRotation * rotationMultiplier);
        setXRotate(yRotation * rotationMultiplier * -1);
        setXShine(width - mouseX);
        setYShine(height - mouseY);
        setScale(1 + clamp(scaleAdd, 0, 1));
      }
    },
    [width, height]
  );

  const checkForNavigation = useCallback(
    (evt: KeyboardEvent) => {
      if (
        [
          "Tab",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "Enter",
          " "
        ].indexOf(evt.key) !== -1
      ) {
        setFlat();
      }
    },
    [width, height]
  );

  const mouseLeftWindow = useCallback(
    (evt: MouseEvent) => {
      if (evt.target instanceof HTMLElement && !evt.relatedTarget) {
        setFlat();
      }
    },
    [width, height]
  );

  useEffect(() => {
    document.addEventListener("mousemove", trackMouse);
    document.addEventListener("mouseout", mouseLeftWindow);
    document.addEventListener("keydown", checkForNavigation);
    return () => {
      document.removeEventListener("mousemove", trackMouse);
      document.removeEventListener("mouseout", mouseLeftWindow);
      document.removeEventListener("keydown", checkForNavigation);
    };
  });

  const selectorTransform = interpolate(
    [positionSpring.selectorTransform, rotationSpring.selectorTransform],
    ([selectTop, selectLeft], [selectXRotate, selectYRotate, scale]) =>
      `translate3d(${selectLeft}px, ${selectTop}px, 50px) perspective(700px) rotateX(${selectXRotate}deg) rotateY(${selectYRotate}deg) scale(${scale})`
  );

  const contentTransform = positionSpring.selectorTransform.interpolate(
    (contentTop, contentLeft) =>
      `translate(${-contentLeft}px, ${-contentTop}px)`
  );

  const shineTransform = rotationSpring.shineTransform.interpolate(
    (xShine, yShine) =>
      `translate(${xShine - shineSize / 2}px, ${yShine - shineSize / 2}px)`
  );

  return (
    <animated.div
      aria-hidden
      className={clsx(
        classes.selection,
        width && height && !selectionActive && classes.active,
        selectionActive && classes.clicked
      )}
      ref={selectorRef}
      style={{
        transform: selectorTransform,
        width: sizeSpring.width.interpolate(width => `${width}px`),
        height: sizeSpring.height.interpolate(height => `${height}px`)
      }}
    >
      <animated.div
        className={classes.content}
        style={{
          transform: contentTransform
        }}
      >
        {children}
      </animated.div>
      <animated.div
        className={clsx(classes.shine, selectionActive && "active")}
        style={{
          transform: shineTransform
        }}
      />
    </animated.div>
  );
}
