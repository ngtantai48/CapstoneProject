import { UpOutlined } from '@ant-design/icons';
import PostPreview from '@components/post-preview';
import Toolbar from '@components/toolbar';
import { usePost } from '@store/post/post.selector';
import { Skeleton } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import { WrapperStyled } from './styled';
import { MAJOR_CATEGORY } from '@utils/constants';

const SearchJob = () => {
  const { onGetAllPostSearch, onGetAllPostSearchMore, postDataSearch, postTotalSize } = usePost();
  const [searchParams] = useSearchParams();

  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(0);
  const handleLoadMore = useCallback(() => {
    if (page === 0) {
      const query: Types.IGetAllPostRequest = {
        page: page + 1,
        limit: 10,
      };
      if (searchParams.get('search')) query.search = searchParams.get('search') || '';
      if (searchParams.get('location')) query.address = searchParams.get('location') || '';
      if (searchParams.get('major')) query.major_category_id = Number(searchParams.get('major'));

      onGetAllPostSearch(query);
      setPage((page) => page + 1);
      return;
    }
    setTimeout(() => {
      const query: Types.IGetAllPostRequest = {
        page: page + 1,
        limit: 10,
      };
      if (searchParams.get('search')) query.search = searchParams.get('search') || '';
      if (searchParams.get('location')) query.address = searchParams.get('location') || '';
      if (searchParams.get('major')) query.major_category_id = Number(searchParams.get('major'));
      onGetAllPostSearchMore(query);
      setPage((page) => page + 1);
    }, 2000);
  }, [page]);

  const handleShowResultSummary = useCallback(() => {
    const temp = ' việc làm ';
    const item = [];
    const major = searchParams.get('major');
    const major_item = MAJOR_CATEGORY.find((i) => i.value === Number(major));
    if (searchParams.get('search')) item.push(searchParams.get('search'));
    if (searchParams.get('location')) item.push(searchParams.get('location'));
    if (major) item.push(major_item?.label);
    return postTotalSize + temp + item.join(' / ');
  }, [postTotalSize]);

  const handleToTop = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollIntoView();
  }, [containerRef]);

  useEffect(() => {
    handleLoadMore();
  }, []);

  return (
    <WrapperStyled ref={containerRef}>
      <div className="toolbar-container">
        <Toolbar />
      </div>
      <div className="job-container">
        <h2 className="summary">{handleShowResultSummary()}</h2>
        {!postTotalSize ? (
          <div>Không tìm thấy dữ liệu phù hợp</div>
        ) : (
          <InfiniteScroll
            className="job-list"
            dataLength={postDataSearch.length} //This is important field to render the next data
            next={handleLoadMore}
            hasMore={postTotalSize > postDataSearch.length}
            loader={<Skeleton active={true} />}
            endMessage={
              page && (
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! Bạn đã xem qua tất cả tin tuyển dụng</b>
                </p>
              )
            }>
            {postDataSearch?.map((item: Types.IDataPostResponse) => {
              return (
                <PostPreview
                  key={item.id}
                  post={item}
                  isSearch={true}
                />
              );
            })}
          </InfiniteScroll>
        )}
      </div>
      <div
        id="to_top"
        onClick={handleToTop}>
        <UpOutlined />
      </div>
    </WrapperStyled>
  );
};

export default SearchJob;
