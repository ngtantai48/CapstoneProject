import styled from 'styled-components';

export const WrapperStyled = styled.div`
  display: block;
  .header {
    font-size: 24px;
    font-weight: 600;
  }
  .container {
    display: block;
    width: 100%;
    .toolbar {
      margin-top: 8px;
      display: flex;
      width: 100%;
      justify-content: space-between;
      .date_picker {
        height: 42px;
      }
      .buttons {
        width: 160px;
        display: flex;
        justify-content: space-between;
      }
    }
    .chart {
      margin-top: 24px;
      display: flex;
      justify-content: center;
      width: 100%;
      max-height: 70vh;
    }
  }
`;
