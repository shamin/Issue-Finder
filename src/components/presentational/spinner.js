import React from "react";
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
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  animation: ${spin} 1s linear infinite;
  transform-origin: 0% 100%;
`;

const SpinnerHolder = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px auto;
`;

const Loading = () => (
  <SpinnerHolder>
    <Spinner />
  </SpinnerHolder>
);

export default Loading;
