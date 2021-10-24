import styled from "styled-components";
import { Flex } from "../flex";

export const FlexItem = styled(Flex)``;
FlexItem.defaultProps = {
  flexShrink: 0,
  justifyContent: "center",
  alignItems: "center",
  bg: "brand",
  height: 300,
  // width: 300,
  mr: 1,
  fontSize: 10,
  fontWeight: 2,
  color: "text100"
};
