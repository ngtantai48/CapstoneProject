import styled from 'styled-components';

export const WrapperStyled = styled.div`
  .container {
    padding: 0 26px;
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    @media (max-width: 1024px) {
      grid-template-columns: auto;
    }
  }
  .pagination {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
`;
