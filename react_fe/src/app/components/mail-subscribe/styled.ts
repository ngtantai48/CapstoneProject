import styled from 'styled-components';

export const WrapperStyled = styled.section`
  min-height: 350px;
  padding: 110px 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(https://images.careerviet.vn/content/Product/bg-4_3.jpg);
  display: flex;
  flex-direction: column;
  align-items: center;
  .container {
    padding: 0 50px;
    max-width: 960px;
    .cb-title {
      text-align: center;
      margin-bottom: 1.875rem;
      color: #ffffff;
      font-size: 1.875rem;
      font-weight: 700;
    }
    .subscribe-form {
      display: flex;
      .input-mail {
        width: 100%;
        height: 50px;
        padding-left: 70px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .btn-subscribe {
        width: 210px;
        height: 50px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        background: linear-gradient(to right, #00b2a3, #00b2a3, #00b2a3);
        color: #ffffff;
        font-weight: 600;
        text-transform: uppercase;
        &:hover {
          border-color: #ffffff;
        }
      }
    }
  }
`;
