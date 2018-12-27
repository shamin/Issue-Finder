import styled from "styled-components";

const Card = styled.div`
  background: #4d5be7;
  color: #ffffff;
  border-radius: 10px;
  margin: 15px 10px;
  padding: 20px;
  .header {
    display: flex;
    align-items: center;
    .icon {
      width: 20px;
    }
    .repo {
      flex: 1;
      font-size: 16px;
      padding-left: 10px;
      font-weight: 500;
    }
    .date{
      font-weight: 300;
      font-size: 14px;
    }
  }
  .title {
    font-weight: 400;
    margin: 15px 0 8px 0;
    font-size: 15px;
  }
  .description {
    font-weight: 300;
    opacity: 0.6;
    font-size: 14px;
  }
`;

export default Card;
