import LogoDefault from '@assets/images/logo-default.png';
import moment from 'moment';
import { useCallback } from 'react';
import { WrapperStyled } from './styled';
import { CalendarOutlined, HeartOutlined } from '@ant-design/icons';
import { handleConvertTimestampToDate } from '@utils/helpers/date-time';
import { useUser } from '@store/user/user.selector';
import { usePost } from '@store/post/post.selector';
import { Button } from 'antd';
import useConfirmModal from 'app/hooks/useConfirmModal';

interface Props {
  post: Types.IDataPostResponse;
  isSearch?: boolean;
  isPostSave?: boolean;
  isAdmin?: boolean;
}
const PostPreview = ({ post, isSearch = false, isPostSave = false, isAdmin = false }: Props) => {
  const { showConfirm, ConfirmDialog } = useConfirmModal();

  const handleFormatDate = useCallback((timestamp: string) => {
    const date = new Date(Number(timestamp));
    return moment(date).fromNow();
  }, []);
  const { onAddUserSavePost } = useUser();
  const { onUpdatePostStatus, onGetAllCrawlPost } = usePost();
  const handleSavePost = useCallback((postId: number) => {
    onAddUserSavePost(postId);
  }, []);
  return (
    <WrapperStyled className="figure">
      <ConfirmDialog />
      <div className="image">
        <a
          target="_blank"
          rel="noreferrer"
          // href="https://careerviet.vn/vi/nha-tuyen-dung/digi-texx-vietnam-ltd.35A6F938.html"
          title={post?.title}>
          <img
            src={(post?.images && post?.images[0]?.src) || LogoDefault}
            className="swiper-lazy swiper-lazy-loaded"
            alt={post?.images && post?.images[0]?.description}
          />
        </a>
      </div>
      <div className="figcaption">
        <div className="title">
          <a
            target="_blank"
            rel="noreferrer"
            href={`/post/${post.id}`}
            title={post?.title}>
            {post?.title}
          </a>
        </div>
        <div className="caption">
          <a
            className="company-name"
            rel="noreferrer"
            title={post?.company}
            href="https://careerviet.vn/vi/nha-tuyen-dung/digi-texx-vietnam-ltd.35A6F938.html"
            target="_blank">
            {post?.company}
          </a>
          <p className="salary">
            <em className="fa fa-usd"></em>Lương:{' '}
            {post?.salary && post?.salary !== 'None' ? post?.salary : 'Trao đổi'}
          </p>
          <div className="location">
            <em className="mdi mdi-map-marker"></em>
            <p>{post?.city}</p>
          </div>
        </div>
      </div>
      {isSearch ? (
        <div className="information">
          <div
            className="information__item hover:text-red-500 cursor-pointer"
            onClick={() => handleSavePost(post?.id)}>
            <HeartOutlined className="mr-2" /> Lưu bài viết
          </div>
          <div className="information__item">
            <CalendarOutlined className="mr-2" />
            Cập nhật: {handleConvertTimestampToDate(post.time, 'MINI')}
          </div>
        </div>
      ) : isPostSave ? (
        <div className="information">
          <div
            className="information__item hover:text-red-500 cursor-pointer"
            onClick={() => handleSavePost(post?.id)}>
            <HeartOutlined className="mr-2" /> Hủy lưu bài viết
          </div>
          {Number.isNaN(Number(post.time)) ? (
            <span className="top">Top</span>
          ) : (
            <p>{handleFormatDate(post.time)}</p>
          )}{' '}
        </div>
      ) : isAdmin ? (
        <div className="top-icon">
          {post.status === 'DELETE' ? (
            <Button
              onClick={() =>
                showConfirm(
                  'Active post',
                  `Do you sure you want to active this post`,
                  () =>
                    onUpdatePostStatus({ id: post.id, status: 'ACTIVE' }).then(() =>
                      onGetAllCrawlPost(),
                    ),
                  () => {},
                  'Active',
                )
              }>
              Active
            </Button>
          ) : (
            <Button
              onClick={() =>
                showConfirm(
                  'Delete post',
                  `Do you sure you want to delete this post`,
                  () =>
                    onUpdatePostStatus({ id: post.id, status: 'DELETE' }).then(() =>
                      onGetAllCrawlPost(),
                    ),
                  () => {},
                  'Delete',
                )
              }>
              Delete
            </Button>
          )}
        </div>
      ) : (
        <div className="top-icon">
          {Number.isNaN(Number(post.time)) ? (
            <span className="top">Top</span>
          ) : (
            <p>{handleFormatDate(post.time)}</p>
          )}{' '}
        </div>
      )}
    </WrapperStyled>
  );
};

export default PostPreview;
