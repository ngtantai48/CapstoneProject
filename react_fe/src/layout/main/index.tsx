// src/Layout.js
import Header from '@components/header'; // Giả sử bạn đã tạo component Header
import Footer from '@components/footer'; // Giả sử bạn đã tạo component Footer
import styled from 'styled-components';

const MainStyled = styled.div`
  min-height: calc(100vh - (60px + 33px));
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = (props: { children: any }) => {
  return (
    <div className="layout">
      <Header />
      <MainStyled>{props.children}</MainStyled>
      <Footer />
    </div>
  );
};

export default Layout;
