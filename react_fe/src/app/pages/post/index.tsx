import PostDetailHeader from '@components/post-detail-header';
import PostDetailBody from '@components/post-detail-body';
import { Tabs, TabsProps } from 'antd';
import PostRecommend from '@components/post-recommend';
import { usePost } from '@store/post/post.selector';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { onGetPostById, postData } = usePost();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    onGetPostById({ id });
  }, [id]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Chi tiết tuyển dụng',
      children: (
        <PostDetailBody
          probationTime={postData?.probationTime}
          time={postData?.time}
          sexual={postData?.sexual}
          description={postData?.description}
          numberEmployees={postData?.numberEmployees}
          requirements={postData?.requirements}
          workWay={postData?.workWay}
          age={postData?.age}
          education={postData?.education}
          experience={postData?.experience}
          right={postData?.right}
          place={postData?.place}
          city={postData?.city}
        />
      ),
    },
  ];

  return (
    <div className="px-10 bg-[#fafaff] pt-5">
      <PostDetailHeader
        id={postData?.id}
        job={postData?.job}
        company={postData?.company}
        salary={postData?.salary}
        probationTime={postData?.probationTime}
        city={postData?.city}
        time={postData?.time}
        images={postData?.images}
        link={postData?.link}
      />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 pb-4">
          <div>
            <Tabs
              defaultActiveKey="1"
              items={items}
              type="card"
            />
          </div>
        </div>
        <div className="w-full lg:w-[25%] lg:ml-8 px-0 md:px-4 lg:px-0">
          <PostRecommend />
        </div>
      </div>
    </div>
  );
};

export default Post;
