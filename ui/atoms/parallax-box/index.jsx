import React, { useRef, useState, useEffect, useMemo } from "react";
import { useViewportScroll, useTransform } from "framer-motion";

import { MotionBox } from "../motion-box";

export const ParallaxBox = ({
  children,
  yOffset = 100, // number > 0
  easing = [0.42, 0, 0.58, 1],
  // easing = "easeInOut", // [number, number, number, number] | "linear" | "easeIn" |
  //"easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" |
  //"backInOut" | "anticipate" | EasingFunction;
  triggerPoint = 0.1, // value between 0 and 1 (top and bottom of the window), point to start animation
  fadeOut = false, // true | false fade an element out on end of the animation
  ...rest
}) => {
  const { scrollY } = useViewportScroll();
  const ref = useRef();
  const [elementTop, setElementTop] = useState(0);
  const [elementBottom, setElementBottom] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const setValues = () => {
      const offset = parseInt(yOffset / (ref.current.clientHeight / 100), 10);
      setScrollOffset(-offset);
      setElementTop(ref.current.offsetTop);
      setElementBottom(ref.current.offsetTop + ref.current.offsetHeight);
      setClientHeight(window.innerHeight);
    };

    setValues();
    document.addEventListener("load", setValues);
    window.addEventListener("resize", setValues);

    return () => {
      document.removeEventListener("load", setValues);
      window.removeEventListener("resize", setValues);
    };
  }, [ref, yOffset]);

  const transformInitialValue = elementTop + yOffset;
  const transformFinalValue = elementTop - clientHeight * triggerPoint;

  const yRange = [transformInitialValue, transformFinalValue];

  const y = useTransform(scrollY, yRange, [`${scrollOffset}%`, "0%"], easing);

  const opacityInitialValue = fadeOut ? 0 : 1;
  const opacityRange = useMemo(() => [opacityInitialValue, 1], [
    opacityInitialValue
  ]);

  const yOpacityRange = [elementBottom, transformFinalValue];
  const opacity = useTransform(
    scrollY,
    yOpacityRange,
    opacityRange,
    "anticipate"
  );

  return (
    <MotionBox ref={ref} initial={{ y: 0 }} style={{ y, opacity }} {...rest}>
      {children}
    </MotionBox>
  );
};
