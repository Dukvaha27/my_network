import styled from "styled-components";

export const Divider = styled.hr`
  ${({ vertical }) =>
    vertical && {
      border: "none",
      borderLeft: "1px solid hsla(200, 10%, 50%,100)",
      width: "1px",
      margin: "0 .5rem",
    }};
  height: ${({ height }) => height};
`;
