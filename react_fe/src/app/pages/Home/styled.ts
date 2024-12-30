import styled from 'styled-components';
export const Wrapper = styled.div`
  .search-engineering {
    display: block;
    position: relative;
    .mainBox {
      position: absolute;
      top: 24px;
      left: 24px;
    }
    .carousel-container {
      .slide img {
        height: 480px; /* Tùy chỉnh chiều cao */
        object-fit: cover; /* Đảm bảo ảnh phủ toàn bộ không gian */
      }
    }
  }
  .top-company {
    margin-top: 65px;
    margin-bottom: 40px;
    h3 {
      width: 100%;
      text-align: center;
      margin-bottom: 1.875rem;
      color: #182642;
      font-size: 1.875rem;
      font-weight: 700;
    }
    .company {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 80px;
      border: 1px solid none;
      transition: 0.4s ease-in-out all;
      border-radius: 3px;
      &:hover {
        border: 1px solid rgb(72, 56, 213);
      }
    }
  }
  .banner {
    padding: 0 80px;
    margin-bottom: 40px;
  }
  .job-list__container {
    min-height: 960px;
  }
  .mail-subscrive__containter {
  }
`;
