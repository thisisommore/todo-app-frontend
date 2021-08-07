import styled from "styled-components";

export default styled.header`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media only screen and (max-width: 634px) {
    .sort-by {
      width: 100%;
    }
    .sign-out {
      margin-left: auto !important;
    }
  }
  .add-task {
    display: flex;
    align-items: center;
    color: #a700aa;
    font-size: var(--font-xl);
    margin-left: 10px;
  }

  .sign-out {
    color: #a700aa;
    font-family: "Cascadia Code", sans-serif;
    margin-left: 40px;
    font-size: var(--font-sm);
  }
`;
