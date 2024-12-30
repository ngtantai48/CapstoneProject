import { Modal } from 'antd';
import styled from 'styled-components';

export const ConfirmStyled = styled(Modal)`
  .ant-modal-content {
    width: 520px;
    border-radius: 10px;
    background-color: #ffffff;
    overflow: hidden;
    .ant-modal-header {
      text-align: center;
      background-color: #f8f9fd;
      .ant-modal-title {
        font-weight: 600;
        font-size: 20px;
        line-height: 26px;
      }
    }
    .ant-modal-body {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 400;
      height: 80px;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #7f7f7f;
    }
    .ant-modal-footer {
      border-top: unset;
      text-align: center;
      padding: 10px 16px 40px;
      button {
        width: 200px;
        height: 45px;
        border-radius: 50px;
      }
      button:first-child {
        color: #7f7f7f;
        background: #f1f2f6;
        border: unset;
      }
      button:last-child {
        color: #ffffff;
        background: linear-gradient(90deg, #4838d5 0%, #485ed5 100%);
        border: unset;
      }
    }
  }
`;
