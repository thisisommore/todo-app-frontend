import styled from "styled-components";

export default styled.div`
  &.high {
    background: #ff0000;
    border: 1px solid #ff0000;
  }
  &.medium {
    background: #049f26;
    border: 1px solid #049f26;
  }
  &.low {
    background: #bdaa00;
    border: 1px solid #bdaa00;
  }
  align-self: flex-start;
  margin-top: auto;
  border-radius: 9px 9px 0 0;
  margin-bottom: -1px;
  p {
    font-family: "Cascadia Code", sans-serif;
    color: white;
    padding: 7px 20px;
    margin: 0;
    font-size: var(--font-xs);
  }
`;
