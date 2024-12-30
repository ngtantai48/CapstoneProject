import styled from 'styled-components';

export const WrapperStyled = styled.div`
  width: 100%;
  display: block;
  .figure-container {
    display: flex;
    justify-content: space-between;
    .user-figure {
      width: 45%;
      p {
        width: 100%;
        text-align: center;
      }
    }
  }
  .view-figure {
    height: 390px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
