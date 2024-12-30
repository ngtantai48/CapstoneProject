import styled from 'styled-components';

export const WrapperStyled = styled.form`
  display: block;
  width: 100%;
  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 16px;
    h2 {
      font-size: 20px;
    }
    .controller {
      display: flex;
      justify-content: space-between;
      .btn {
        &:first-child {
          margin-right: 8px;
        }
        text-transform: uppercase;
      }
    }
  }
  .basic-info {
    display: block;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.35);
    h2 {
      font-size: 16px;
      padding: 8px 16px;
      border-bottom: 1px solid #e5e5e5;
    }
    .user_info {
      display: flex;
      padding: 16px 40px;
      .avatar {
        width: 99px;
        height: 99px;
        border-radius: 50%;
        overflow: hidden;
        object-fit: contain;
      }
      .info {
        display: block;
        margin-left: 16px;
        h3 {
          font-size: 16px;
          color: #000000de;
        }
        .id {
          color: #00000099;
        }
        .change__password {
          width: 190px;
          margin-top: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
          text-transform: uppercase;
          color: #000000de;
          padding: 4px 8px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
        }
      }
    }
    .edit-container {
      display: block;
      padding: 16px;
      .row1 {
        display: flex;
        .field {
          width: 45%;
          margin-right: 8px;
        }
      }
    }
  }
`;
