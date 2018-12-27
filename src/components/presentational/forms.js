import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #4d5be7;
  border-radius: 4px;
`;

export const Form = styled.div`
  padding: 0 100px 100px;
  position: relative;
  .label {
    display: block;
    color: #393770;
    font-weight: 500;
    margin: 40px 0 10px 0;
  }
  .react-select-container{
    width: 100%;
    .react-select__control{
      border: 1px solid #4d5be7;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid #4d5be7;
  background: #4d5be7;
  color: #ffffff;
  margin-top: 50px;
  font-size: 16px;
`;
