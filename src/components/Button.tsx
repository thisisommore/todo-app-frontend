import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

type IProps = {
  width?: string;
};

const Button = styled.button<IProps>`
  display: inline-flex;
  background: #a700aa;
  color: white;
  border: none;
  border-radius: 9px;
  padding: 10px 25px;
  font-size: var(--font-md);
  font-family: "Cascadia Code", sans-serif;
`;

type Props = PropsWithChildren<ButtonHTMLAttributes<{}>> & {
  isLoading?: boolean;
};

export default function (props: Props) {
  return (
    <Button {...props}>
      {props.children}
      {props.isLoading ? <Spinner></Spinner> : ""}
    </Button>
  );
}
