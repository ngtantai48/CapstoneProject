import styled from 'styled-components';

export const WrapperStyled = styled.div`
  display: block;
  width: 100%;
  .container-search {
    display: grid;
    width: 100%;
    grid-auto-flow: column;
    grid-template-columns: auto auto auto 40px;
    align-items: center;
    gap: 20px;
    .search-btn {
      width: 36px;
      height: 36px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-weight: bold;
      background: linear-gradient(90deg, rgb(72, 56, 213) 0%, rgb(72, 95, 213) 100%);
      &:hover {
        background: linear-gradient(90deg, rgb(72, 56, 213) 0%, rgb(72, 95, 213) 80%);
        color: #ffffff;
      }
    }
  }
  .container-selection {
    display: grid;
    width: 100%;
    grid-auto-flow: column;
    grid-template-columns: 33% 33% 33%;
    align-items: center;
    gap: 20px;
    color: #8e9094;
    .selection {
      border-left: 1px solid #e5e5e5;
      .ant-select-selector {
        background-color: transparent;
        border: transparent;
        outline: transparent;
        border-radius: 0;
      }
    }
  }
`;
