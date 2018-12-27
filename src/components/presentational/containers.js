import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 350px;
  max-height: 500px;
  height: 500px;
  background: #fcfcfc;
  font-family: "Roboto", sans-serif;
  overflow: hidden;
  p {
    padding: 0;
    margin: 0;
  }
`;

export const Header = styled.div`
  border: 1px solid #eff0f4;
  background: #ffffff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  .logo {
    width: 40px;
  }
  .name {
    font-size: 20px;
    text-transform: uppercase;
    color: #393770;
    display: inline-block;
    margin-left: 10px;
    flex: 1;
  }
`;

export const Body = styled.div`
  height: calc(500px - 73px);
  overflow: scroll;
`;
