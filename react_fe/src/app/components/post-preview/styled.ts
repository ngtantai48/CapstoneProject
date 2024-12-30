import styled from 'styled-components';

export const WrapperStyled = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  position: relative;
  margin-bottom: 16px;
  max-height: 300px;
  .image {
    display: flex;
    flex: 0 0 79px;
    align-items: center;
    justify-content: center;
    max-width: 79px;
    height: 79px;
    padding: 5px;
    border: 1px solid #e5e5e5 !important;
    border-radius: 5px;
  }
  .figcaption {
    flex: 0 0 auto;
    max-width: calc(100% - 79px);
    padding-left: 15px;
    .title {
      margin-bottom: 3px;
      a {
        display: -webkit-box;
        overflow: hidden;
        color: #172642;
        font-size: 16px;
        font-weight: 700;
        line-height: 1.2;
        text-overflow: ellipsis;
        margin-top: 10px;
        max-height: 38px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        &:hover {
          color: #e8c80d;
        }
      }
    }
    .caption {
      color: #5d677a;
      font-size: 14.5px;
      line-height: 1.4;
      .company-name {
        display: -webkit-box;
        overflow: hidden;
        color: #5d677a;
        text-overflow: ellipsis;
      }
      .salary {
        color: #008563;
      }
    }
    .location {
      display: flex;
    }
  }
  .information {
    display: flex;
    flex-direction: column;
    bottom: 8px;
    right: 16px;
    position: absolute;
    .information__item {
      display: flex;
      justify-content: end;
    }
  }
  .top-icon {
    display: block;
    bottom: 5px;
    right: 5px;
    top: auto;
    position: absolute;
    .top {
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 16px;
      padding: 1.5px 4.5px;
      border-top-right-radius: 4px;
      border-bottom-left-radius: 4px;
      background: #e8c80d;
      color: #ffffff;
      font-size: 12px;
      line-height: 1;
      text-transform: uppercase;
    }
  }
`;
