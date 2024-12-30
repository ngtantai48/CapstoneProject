import { PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import FormInput from '@components/form/FormInput';
import FormSelect from '@components/form/FormSelect';
import { MAJOR_CATEGORY } from '@utils/constants';
import { objectToQueryString } from '@utils/helpers/request';
import { Button, Col, Form, Row } from 'antd';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from './styled';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MainBox = ({ className }: any) => {
  const navigate = useNavigate();
  const form = useForm<{
    search?: string;
    location: string;
    major: string;
    salary: string;
    rank: string;
  }>();
  const { handleSubmit } = form;
  const handleSearch = useCallback(
    (data: Types.ISearchPost) => {
      const query = objectToQueryString(data);
      navigate('/search-job?' + query);
    },
    [form],
  );
  return (
    <Wrapper className={className}>
      <div className="main-box__top">
        <div className="main-box__top_title">
          <h1>
            Đón lấy thành công với <p> 27,582 cơ hội nghề nghiệp </p>
          </h1>
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(handleSearch)}
            className="main-box__top_search"
            autoComplete="off">
            <Row gutter={8}>
              <Col span={24}>
                <FormInput
                  name="search"
                  placeholder="Chức danh, Kỹ năng, Tên công ty"
                />
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={12}>
                <FormInput
                  name="location"
                  placeholder="Tất cả địa điểm"
                />
              </Col>
              <Col span={12}>
                <FormSelect
                  allowClear
                  name="major"
                  options={MAJOR_CATEGORY}
                  virtual={false}
                  placeholder="Tất cả ngành nghề"
                />
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={12}>
                <FormInput
                  name="salary"
                  placeholder="Chọn mức lương"
                />
              </Col>
              <Col span={12}>
                <FormInput
                  name="rank"
                  placeholder="Cấp bậc"
                />
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={12}>
                <div className="reload">
                  <ReloadOutlined />
                  Reset
                </div>
              </Col>
              <Col span={12}>
                <div className="advance-container">
                  <div className="advance">
                    <PlusCircleOutlined />
                    Tìm kiếm nâng cao
                  </div>
                </div>
              </Col>
            </Row>

            <Form.Item>
              <Button
                className="search_button"
                type="primary"
                htmlType="submit">
                Tìm việc ngay
              </Button>
            </Form.Item>
          </form>
        </FormProvider>
      </div>
      <div className="main-box__bottom">
        <p className="main-box__bottom_title">Đăng hồ sơ nghề nghiệp để dễ dàng ứng tuyển nhanh</p>
        <Button className="main-box__bottom_submit">Đăng ngay</Button>
      </div>
    </Wrapper>
  );
};

export default MainBox;
