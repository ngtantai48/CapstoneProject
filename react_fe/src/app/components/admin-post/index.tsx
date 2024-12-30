import PostPreview from '@components/post-preview';
import { usePost } from '@store/post/post.selector';

const AdminPost = () => {
  const { postAdmin } = usePost();

  return (
    <div>
      {postAdmin?.map((item: Types.IDataPostResponse) => {
        return (
          <PostPreview
            key={item.id}
            post={item}
            isAdmin={true}
          />
        );
      })}
    </div>
  );
};

export default AdminPost;
