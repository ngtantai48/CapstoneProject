import PostContainer from '@components/post-container';
import { usePost } from '@store/post/post.selector';
import type { TabsProps } from 'antd';
import { useCallback, useEffect } from 'react';
import { TabsStyled } from './styled';
const PostList = () => {
  const { onGetAllPost, postsList } = usePost();
  const handleGetData = useCallback(() => {
    onGetAllPost({ page: 1, limit: 10 });
  }, [postsList]);
  useEffect(() => {
    handleGetData();
  }, []);
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Việc làm nổi bật',
      children: <PostContainer data={postsList} />,
    },
    {
      key: '2',
      label: 'Việc làm VIP ($1000+)',
      children: 'Comming soon',
    },
  ];
  return (
    <TabsStyled
      style={{ marginBottom: 32 }}
      defaultActiveKey="1"
      items={items}
      onChange={handleGetData}
    />
  );
};

export default PostList;
