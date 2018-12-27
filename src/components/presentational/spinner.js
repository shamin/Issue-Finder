import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border-top-right-radius: 20px;
  border: 2px solid #4d5be7;
  border-left: 0;
  border-bottom: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  margin: 10px auto;
  animation: ${spin} 1s linear infinite;
  transform-origin: 0% 100%;
`;

export default Spinner;
