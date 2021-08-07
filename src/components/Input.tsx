import React from "react";
import styled from "styled-components";
export default styled.input`
  border: 1px solid #969696;
  border-radius: 14px;
  padding: 20px;
  margin: 10px;
  font-size: var(--font-sm);
  font-family: "Cascadia Code", sans-serif;
  width: 80%;
  ::placeholder {
    color: #969696;
  }

  :focus {
    outline: none;
  }

  &.invalid {
    border: 1px solid red;
    box-shadow: 0 0 10px red;
  }
`;
