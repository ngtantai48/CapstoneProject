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
    }
    &__container {
      display: block;
      padding: 16px;
      .row {
        display: flex;
        justify-content: space-between;
        .field {
          min-width: 360px;
          margin-right: 8px;
          label {
            width: 140px;
            text-align: start;
          }
          input {
            width: 100%;
          }
        }
      }
    }
  }
`;
