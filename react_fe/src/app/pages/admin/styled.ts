import styled from 'styled-components';

export const WrapperStyled = styled.div`
  display: flex;
  position: sticky;
  .menu {
    height: 100%;
    position: sticky;
  }
  .content {
    padding: 12px;
    width: 100%;
    overflow: scroll;
    height: calc(100vh - 74px);
  }
`;
