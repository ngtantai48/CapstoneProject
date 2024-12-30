import PostPreview from '@components/post-preview';
import { WrapperStyled } from './styled';
import { Pagination } from 'antd';
import { useCallback, useRef } from 'react';
import { usePost } from '@store/post/post.selector';
interface Props {
  data: Types.IDataPostResponse[];
}

const PostContainer = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { onGetAllPost, postTotalSize } = usePost();
  const handleChangePagination = useCallback((page: number) => {
    if (!containerRef.current) return;
    onGetAllPost({ page, limit: 10 });
    containerRef.current.scrollIntoView();
  }, []);
  return (
    <WrapperStyled ref={containerRef}>
      <div className="container">
        {data?.map((item) => {
          return (
            <PostPreview
              key={item.id}
              post={item}
            />
          );
        })}
      </div>
      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          defaultPageSize={10}
          showSizeChanger={false}
          total={postTotalSize}
          onChange={handleChangePagination}
        />
      </div>
    </WrapperStyled>
  );
};

export default PostContainer;
