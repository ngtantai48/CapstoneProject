import styled from 'styled-components';

export const WrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: #0000003b;
  .container {
    display: flex;
    flex-direction: column;
    width: 480px;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    .header-wrapper {
      position: relative;
      width: 100%;
      height: 58px;
      background-color: #f8f9fd;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 1px 3px 0px #7e818e52;
      #header {
        font-size: 18px;
        text-align: center;
        font-weight: 600;
      }
    }
    #form_change_password {
      padding: 24px;
      .controller {
        margin-top: 16px;
        width: 100%;
        display: flex;
        justify-content: center;
        .btn {
          &:first-child {
            margin-right: 8px;
          }
          text-transform: uppercase;
        }
      }
    }
  }
`;
