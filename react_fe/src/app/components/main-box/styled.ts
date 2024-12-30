import styled from 'styled-components';
export const Wrapper = styled.div`
  width: 495px;
  box-shadow: 0px 1px 7px 0px #7e818e52;
  border-radius: 10px;
  .main-box__top {
    padding: 35px 35px 1px 30px;
    background: rgba(255, 255, 255, 0.75);
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    transition: 0.4s ease-in-out all;
    &_title {
      display: grid;
      color: #191a1d;
      font-size: 20px;
      font-weight: 500;
      line-height: 1.2;
      p {
        font-size: 24px;
        font-weight: 700;
      }
    }
    &_search {
      margin-top: 8px;
      .ant-form-item {
        margin-bottom: 10px;
      }
      .reload {
        text-align: left;
        display: flex;
        width: 56px;
        justify-content: space-between;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .advance-container {
        display: flex;
        justify-content: end;
        .advance {
          text-align: end;
          display: flex;
          width: 140px;
          justify-content: space-between;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .search_button {
        width: 100%;
        height: 40px;
        color: #ffffff;
        text-transform: uppercase;
        font-weight: 600;
        margin-top: 8px;
        background-image: linear-gradient(to right, #00b2a3, #00b2a3, #00b2a3);
        &:hover {
          background-image: linear-gradient(to right, #00b2a3, #00b2a3, #00b2a3);
        }
      }
    }
  }
  .main-box__bottom {
    padding-top: 20px;
    padding-right: 35px;
    padding-bottom: 30px;
    padding-left: 35px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    background: rgba(215, 240, 252, 0.6);
    transition: 0.4s ease-in-out all;
    &_title {
      margin-bottom: 10px;
      color: #5d677a;
      font-size: 16px;
      font-weight: 500;
    }
    &_submit {
      width: 100%;
      height: 40px;
      color: #ffffff;
      text-transform: uppercase;
      border: unset;
      font-weight: 600;
      margin-top: 8px;
      background-image: linear-gradient(to right, #2f4ba0, #2f4ba0, #2f4ba0);
      &:hover {
        color: #ffffff;
      }
    }
  }
`;
