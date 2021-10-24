import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "styled-components";

import {
  Annotation,
  Box,
  Container,
  DragSlider,
  FlexItem,
  Heading,
  Paragraph,
  theme
} from "../../ui";

import "../../ui/molecules/global-styles/global.css";

function rand(min = 200, max = 500) {
  return Math.floor(Math.random() * (+max - +min)) + +min;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box textAlign="center">
          <Heading as="h1">Framer Motion Example - Drag Slider</Heading>
        </Box>
        <Box mb={6}>
          <DragSlider>
            {[...Array(24).keys()].map((item, key) => (
              <FlexItem key={key} width={rand()}>
                {item + 1}
              </FlexItem>
            ))}
          </DragSlider>
          <Heading as="h3">slideApperance = "fadeIn"</Heading>
          <DragSlider slideApperance="fadeIn">
            {[...Array(24).keys()].map((item, key) => (
              <FlexItem key={key} width={rand()}>
                {item + 1}
              </FlexItem>
            ))}
          </DragSlider>
          <Heading as="h3">slideApperance = "scale"</Heading>
          <DragSlider slideApperance="scale">
            {[...Array(24).keys()].map((item, key) => (
              <FlexItem key={key} width={rand()}>
                {item + 1}
              </FlexItem>
            ))}
          </DragSlider>
        </Box>
        <Heading as="h3">DragSlider props:</Heading>
        <Box>
          <Paragraph>
            slideApperance? = "fadeIn",
            <Annotation>"scale" | "fadeIn"</Annotation>
          </Paragraph>
          <Paragraph>
            bounceStiffness? = 100,
            <Annotation>
              Affects the stiffness of the bounce spring. Higher values will
              create more sudden movement.
            </Annotation>
          </Paragraph>
          <Paragraph>
            bounceDamping? = 10
            <Annotation>
              affects the damping of the bounce spring. If set to 0, spring will
              oscillate indefinitely.
            </Annotation>
          </Paragraph>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
