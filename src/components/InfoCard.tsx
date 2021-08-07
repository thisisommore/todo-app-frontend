import styled from "styled-components";

export default styled.div`
  display: inline-block;
  background: white;
  opacity: 0;
  height: 1px;
  padding: 0px !important;
  transition: 0.4s ease-out;
  color: white;
  border-radius: 22px;
  padding: 0px;
  align-self: center;
  margin: 10px 0px;
  font-family: "Cascadia Code", sans-serif;

  &.error {
    background: #fa0000;
    opacity: 1;
    height: initial;
    padding: 20px !important;
  }

  &.info {
    background: #07a002;
    opacity: 1;
    height: initial;
    padding: 20px !important;
  }
`;
