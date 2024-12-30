import { Button, Input, Select } from 'antd';
import { WrapperStyled } from './styled';
import { SearchOutlined } from '@ant-design/icons';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { objectToQueryString } from '@utils/helpers/request';
import { MAJOR_CATEGORY } from '@utils/constants';

interface ISearchState {
  search: string;
  major: string | number;
  location: string;
  rank: string;
  time: string;
  work_way: string;
}
const Toolbar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selection = useMemo(() => {
    return {
      major: MAJOR_CATEGORY,
      location: [
        { value: 'ha noi', label: 'Hà Nội' },
        { value: 'da nang', label: 'Đà Nẵng' },
        { value: 'ho chi minh', label: 'Hồ Chí Minh' },
      ],
      rank: [
        { value: 'nhân viên', label: 'Nhân viên' },
        { value: 'thực tập sinh', label: 'Thực tập sinh' },
      ],
      time: [
        { value: 1, label: '3 ngày trước' },
        { value: 2, label: '1 tuần' },
        { value: 3, label: '2 tuần' },
        { value: 4, label: '1 tháng' },
      ],
      work_way: [
        { value: 'offline', label: 'Offline' },
        { value: 'remote', label: 'Remote' },
        { value: 'hibrid', label: 'Hibrid' },
        { value: 'freelancer', label: 'Freelancer' },
      ],
    };
  }, []);
  console.log(searchParams.get('search'));

  const [searchState, setSearchState] = useState<ISearchState>({
    search: searchParams.get('search') || '',
    major: searchParams.get('major') || '',
    location: searchParams.get('location') || '',
    rank: searchParams.get('rank') || '',
    time: searchParams.get('time') || '',
    work_way: searchParams.get('work_way') || '',
  });
  const handleSearch = useCallback(() => {
    const query = objectToQueryString(searchState);
    navigate('/search-job?' + query);
    navigate(0);
  }, [searchState]);
  return (
    <WrapperStyled>
      <div className="container-search">
        <Input
          placeholder="Chức danh, kỹ năng, tên công ty"
          allowClear={true}
          onChange={(e) => {
            setSearchState((prev) => ({ ...prev, search: e.target.value }));
          }}
          value={searchState.search}
        />
        <Select
          placeholder="Tất cả ngành nghề"
          options={selection.major}
          onChange={(value) => {
            setSearchState((prev) => ({ ...prev, major: value }));
          }}
          defaultValue={searchState.major ? Number(searchState.major) : ''}
          allowClear
        />
        <Select
          placeholder="Tất cả địa điểm"
          options={selection.location}
          onChange={(value) => {
            setSearchState((prev) => ({ ...prev, location: value }));
          }}
          allowClear
          value={searchState.location}
        />
        <Button className="search-btn">
          <SearchOutlined onClick={handleSearch} />
        </Button>
      </div>
      <div className="container-selection">
        <Select
          className="selection"
          placeholder="Cấp bậc"
          options={selection.rank}
          onChange={(value) => {
            setSearchState((prev) => ({ ...prev, rank: value }));
          }}
          allowClear
          value={searchState.rank}
        />
        <Select
          className="selection"
          placeholder="Đăng trong vòng"
          options={selection.time}
          onChange={(value) => {
            setSearchState((prev) => ({ ...prev, time: value }));
          }}
          allowClear
          value={searchState.time}
        />
        <Select
          className="selection"
          placeholder="Hình thức làm việc"
          options={selection.work_way}
          onChange={(value) => {
            setSearchState((prev) => ({ ...prev, work_way: value }));
          }}
          allowClear
          value={searchState.work_way}
        />
      </div>
    </WrapperStyled>
  );
};

export default Toolbar;
