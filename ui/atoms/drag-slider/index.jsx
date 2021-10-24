import React, { useRef, useEffect, useState } from "react";

import styled from "styled-components";
import { useMotionValue } from "framer-motion";

import { MotionBox } from "../motion-box";
import { ScaleBox } from "../scale-box";
import { FadeInUpBox } from "../fade-in-up-box";
import { IntersectionObserver } from "../intersection-observer";

// ! Fix slider reset on final slide

const Slider = styled(MotionBox)`
  cursor: grab;
`;
Slider.defaultProps = {
  display: "flex",
  justifyContent: "space-between"
};

const SliderWrap = ({
  children,
  sliderRef,
  x,
  sliderConstraints,
  bounceStiffness,
  bounceDamping
}) => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Slider
        ref={sliderRef}
        drag="x"
        initial={{ x: 0 }}
        style={{ x }}
        // style={{ x: scrollXValue }}
        dragConstraints={{
          left: `${-sliderConstraints}`,
          right: 0
        }}
        dragTransition={{ bounceStiffness, bounceDamping }}
      >
        {children}
      </Slider>
    </div>
  );
};

export const DragSlider = ({
  children,
  slideApperance, // scale | fadeIn
  bounceStiffness = 100, // Affects the stiffness of the bounce spring. Higher values will create more sudden movement.
  bounceDamping = 10 // affects the damping of the bounce spring. If set to 0, spring will oscillate indefinitely.
}) => {
  const ref = useRef();
  const x = useMotionValue(0);

  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderChildrenWidth, setSliderChildrenWidth] = useState(0);
  const [sliderConstraints, setSliderConstraints] = useState(0);

  useEffect(() => {
    if (!ref && !ref.current) return;

    const calcSliderChildrenWidth = () => {
      setSliderChildrenWidth(
        ref?.current?.scrollWidth
      );
    };

    calcSliderChildrenWidth();

    const calcSliderWidth = () => {
      setSliderWidth(ref?.current?.clientWidth);
    };

    calcSliderWidth();
    window.addEventListener("resize", calcSliderWidth);

    const calcSliderConstraints = () => {
      setSliderConstraints(sliderChildrenWidth - sliderWidth);
    };

    calcSliderConstraints();
    window.addEventListener("resize", calcSliderConstraints);
  }, [ref, sliderChildrenWidth, sliderWidth]);

  return (
    <SliderWrap
      sliderRef={ref}
      x={x}
      sliderConstraints={sliderConstraints}
      bounceStiffness={bounceStiffness}
      bounceDamping={bounceDamping}
    >
      {slideApperance === "scale" ? (
        <>
          {React.Children.map(children, (child) => (
            <IntersectionObserver reset="true">
              <ScaleBox>{React.cloneElement(child)}</ScaleBox>
            </IntersectionObserver>
          ))}
        </>
      ) : slideApperance === "fadeIn" ? (
        <>
          {React.Children.map(children, (child) => (
            <IntersectionObserver reset="true">
              <FadeInUpBox yOffset={0} duration={0.25}>
                {React.cloneElement(child)}
              </FadeInUpBox>
            </IntersectionObserver>
          ))}
        </>
      ) : (
        <>{children}</>
      )}
    </SliderWrap>
  );
};
