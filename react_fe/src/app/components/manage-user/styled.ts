import { Space } from 'antd';
import styled from 'styled-components';

export const WrapperStyled = styled.div`
  width: 100%;
  .yes {
    color: #25cb0a;
  }
  .no {
    color: #cf0025;
  }
  .header {
    margin-bottom: 26px;
  }
`;

export const SpaceStyled = styled(Space)`
  a.button {
    display: block;
    text-decoration: none;
    width: auto;
    padding: 4px 8px;
    color: #4861d5;
    background: #d3dbff;
    border-radius: 4px;
    text-align: center;
  }
  .more-button {
    font-size: 16px;
    color: #4861d5;
    cursor: pointer;
  }
  .block {
    color: #cf0025;
  }
  .active {
    color: #25cb0a;
  }
  .delete {
    color: #363f72;
  }
  .payment_status {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    border-radius: 4px;
    padding: 4px 0;
    font-size: 12px;
  }
  .paid {
    color: #25cb0a;
    border: 1px solid #25cb0a;
  }
  .unpaid {
    color: #ab0000;
    border: 1px solid #ab0000;
  }
  .processing {
    color: #f3cc00;
    border: 1px solid #f3cc00;
  }
`;
