import styled from 'styled-components';

export const WrapperStyled = styled.div`
  display: block;
  overflow-y: scroll;
  .container {
    padding: 0 26px;
    display: block;
    min-height: calc(100vh - 180px);
    @media (max-width: 1024px) {
      grid-template-columns: auto;
    }
    .post {
      width: 100%;
    }
  }
`;
