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
  transition: 0.3s;
  ::placeholder {
    color: #969696;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 8px 2px #a700aa;
  }

  &.invalid {
    border: 1px solid red;
    box-shadow: 0 0 10px red;
  }
`;
