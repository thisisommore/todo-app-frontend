import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

type IProps = {
  width?: string;
};

const StyledButton = styled.button<IProps>`
  display: inline-flex;
  background: #a700aa;
  color: white;
  border: none;
  border-radius: 9px;
  padding: 10px 25px;
  font-size: var(--font-md);
  font-family: "Cascadia Code", sans-serif;
  transition: 0.3s;
  @media (hover: hover) {
    :hover {
      transform: scale(0.94);
      cursor: none;
    }
  }

  :active {
    transform: scale(1.1);
  }
`;

type Props = PropsWithChildren<ButtonHTMLAttributes<{}>> & {
  isLoading?: boolean;
};

const Button = function (props: Props) {
  return (
    <StyledButton {...props}>
      {props.children}
      {props.isLoading ? <Spinner></Spinner> : ""}
    </StyledButton>
  );
};
export default Button;
