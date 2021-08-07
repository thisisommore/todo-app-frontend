import styled from "styled-components";

export default styled.div`
  align-self: center;
  margin-left: 10px;
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #a700aa; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
