import styled from "styled-components";
import React, { Component } from "react";
import firstUpperCase from "../utils/firstUpperCase";

const Container = styled.div`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  font-size: var(--font-sm);

  p {
    font-family: "Cascadia Code", sans-serif;
    color: #a700aa;
    margin: 0;
    margin-right: 10px;
  }

  .selection {
    border-spacing: 0px;
    display: flex;

    .item {
      padding: 4px 6px;
      color: #a700aa;
      transition: 0.3s;
      margin-left: -2px;
      border: 2px solid #a700aa;

      &.active {
        background: #a700aa;
        color: white;
      }
    }
  }
`;

type TProps = {
  label: string;
  options: string[];
  className?: string;
  onChange?: (event: { target: { value: string } }) => any;
  value?: any;
  [key: string]: any;
};

export default class Select extends Component<TProps> {
  state = {
    selectedOption: this.props.value,
  };
  render() {
    return (
      <Container className={this.props.className}>
        <p>{this.props.label}</p>
        <div className="selection">
          {this.props.options.map((option, i) => (
            <div
              key={i}
              className={`item ${this.props.value === option ? "active" : ""}`}
              onClick={() =>
                this.props.onChange?.({ target: { value: option } })
              }
            >
              {firstUpperCase(option)}
            </div>
          ))}
        </div>
      </Container>
    );
  }
}
