import styled from 'styled-components';

export const WrapperStyled = styled.div`
  display: block;
  width: 100%;
  @keyframes to_top {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-4px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  #to_top {
    position: fixed;
    bottom: 46px;
    right: 16px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(90deg, rgb(72, 56, 213) 0%, rgb(72, 95, 213) 100%);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    color: #f2f2f2;
    &:hover span {
      animation-name: example;
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }
  }
  .toolbar-container {
    padding: 16px 40px;
    background-color: #f2f2f2;
    border-bottom: 1px solid #e5e5e5;
  }
  .job-container {
    padding: 10px;
    .summary {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 22px;
      font-weight: 600;
      color: #5d677a;
      padding: 6px 0;
      text-align: left;
      margin-bottom: 8px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
`;
