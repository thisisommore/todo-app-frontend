import styled from "styled-components";

const InfoText = styled.p<{ inValid?: boolean }>`
  color: #a700aa;
  font-size: var(--font-xs);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;

  transition: 0.3s;
  font-weight: bold;
`;

export default InfoText;
