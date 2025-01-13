import PostPreview from '@components/post-preview';
import { useUser } from '@store/user/user.selector';
import { useEffect, useRef } from 'react';
import { WrapperStyled } from './styled';

const PostSave = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { onGetUserSavePost, savePost } = useUser();
  useEffect(() => {
    onGetUserSavePost();
  }, []);
  return (
    <WrapperStyled ref={containerRef}>
      <div className="container">
        {savePost?.map((item: Types.IDataPostResponse) => {
          return (
            <div
              className="post"
              key={item.id}>
              <PostPreview
                post={item}
                isPostSave={true}
              />
            </div>
          );
        })}
      </div>
    </WrapperStyled>
  );
};

export default PostSave;
