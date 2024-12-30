import Slide_1 from '@assets/images/slide_1.png';
import Slide_2 from '@assets/images/slide_2.png';
import GridComponent from '@components/common/Grid';
import MailSubscribe from '@components/mail-subscribe';
import MainBox from '@components/main-box';
import PostList from '@components/post-list';
import { banner, topCompany } from '@utils/constants';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Wrapper } from './styled';

const Home = () => {
  return (
    <Wrapper>
      <div className="search-engineering">
        <Carousel
          autoPlay
          className="carousel-container"
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop>
          <div>
            <img
              src={Slide_1}
              alt="Slide 1"
            />
          </div>
          <div>
            <img
              src={Slide_2}
              alt="Slide 2"
            />
          </div>
        </Carousel>
        <MainBox className="mainBox" />
      </div>
      <div className="top-company">
        <h3>NHÀ TUYỂN DỤNG HÀNG ĐẦU</h3>
        <GridComponent
          gap="20px"
          padding="20px"
          minWidth="180px">
          {topCompany.map((img) => {
            return (
              <div
                key={img}
                className="company">
                <img src={img} />
              </div>
            );
          })}
        </GridComponent>
      </div>
      <div className="ads-career">
        <GridComponent
          gap="20px"
          padding="20px"
          minWidth="40%">
          {banner.map((img) => {
            return (
              <div
                key={img}
                className="banner">
                <img src={img} />
              </div>
            );
          })}
        </GridComponent>
      </div>
      <div className="job-list__container">
        <PostList />
      </div>
      <div className="mail-subscrive__containter">
        <MailSubscribe />
      </div>
    </Wrapper>
  );
};

export default Home;
