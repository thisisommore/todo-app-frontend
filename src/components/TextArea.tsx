import styled from "styled-components";
export default styled.textarea`
  border: 1px solid #969696;
  border-radius: 14px;
  padding: 20px;
  margin: 10px;
  font-size: var(--font-sm);
  font-family: "Cascadia Code", sans-serif;
  width: 80%;
  height: ${(props) => (props.rows ? "initial" : "50vh")};

  @media only screen and (max-width: 561px) {
    width: 90%;
  }
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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
