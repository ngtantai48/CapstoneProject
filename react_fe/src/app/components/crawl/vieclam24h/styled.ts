import styled from 'styled-components';

export const WrapperStyled = styled.div`
  display: block;
  h2 {
    font-size: 24px;
    font-weight: 600;
  }
  .container {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    box-shadow: 0px 1px 7px 0px #7e818e52;
    padding: 20px;
    min-height: 500px;
    border-radius: 10px;
    .toolbar {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 8px;
      .status {
        width: 120px;
        padding: 4px;
        font-size: 16px;
        border: 1px solid #eeeeee;
        background-color: #e5e5e5;
        border-radius: 6px;
        text-align: center;
        cursor: pointer;
        &.processing {
          background-color: #d3dbff;
          border: 1px solid #4861d5;
          color: #4861d5;
        }
        &.ready {
          background-color: #fefefe;
          border: 1px solid #25cb0a;
          color: #25cb0a;
        }
      }
      .trigger {
        background: linear-gradient(90deg, #4838d5 0%, #485ed5 100%);
        width: 200px;
        color: #ffffff;
        box-shadow: 0px 4px 4px 0px #0000001c;
      }
    }
    .console {
      margin-top: 8px;
      display: block;
      border-radius: 6px;
      background-color: #0d0d0d;
      width: 100%;
      height: 420px;
      padding: 16px;
      color: #738685;
      font-size: 12px;
      overflow: scroll;
    }
  }
`;
