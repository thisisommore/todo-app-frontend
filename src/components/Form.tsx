import styled from "styled-components";

type IProps = {
  justifyCenter?: boolean;
  alignItemsCenter?: boolean;
};
export default styled.form<IProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.justifyCenter ? "center" : "initial")};
  align-items: ${(props) => (props.alignItemsCenter ? "center" : "initial")};
`;
