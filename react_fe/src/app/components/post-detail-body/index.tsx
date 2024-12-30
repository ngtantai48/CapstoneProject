import {
  AppstoreOutlined,
  CarryOutOutlined,
  CompassOutlined,
  CrownOutlined,
  DeploymentUnitOutlined,
  FacebookOutlined,
  FileDoneOutlined,
  InsertRowAboveOutlined,
  PicRightOutlined,
  ShareAltOutlined,
  TeamOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { dateTimeHelper } from '@utils/helpers';

interface Props {
  probationTime: string;
  time: string;
  description: string;
  sexual: string;
  numberEmployees: number;
  age: string;
  education: string;
  experience: string;
  right: string;
  requirements: string;
  workWay: string;
  place: string;
  city: string;
}

const PostDetailBody = ({
  probationTime,
  time,
  sexual,
  description,
  numberEmployees,
  requirements,
  workWay,
  age,
  education,
  experience,
  right,
  place,
  city,
}: Props) => {
  return (
    <div className="w-full px-10 text-16 font-semibold bg-white p-[14px] cursor-pointer text-se-accent-100 text-center border-se-accent-100 shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
      <div className="py-4 bg-white shadow-sd-12 rounded-sm">
        <h2 className=" text-24 font-semibold py-4 text-start text-[24px]">Thông tin chung</h2>
        <div className="bg-[#F5F3FF] px-4 pt-5 pb-1 mb-6">
          <div className="md:flex md:border-b border-[#DDD6FE] mb-4">
            <div className="flex items-center mb-4 md:w-[33%] text-start">
              <CarryOutOutlined className="w-[32px] h-[32px] min-w-[32px] flex items-center justify-center rounded-full bg-[#EDE9FE] text-[#8B5CF6] text-20 svicon-calendar-day" />
              <h3 className="ml-3">
                <p className="mr-1 text-se-neutral-64 text-[12px]">Ngày đăng</p>
                <p className="text-[14px]">{dateTimeHelper.handleConvertTimestampToDate(time)}</p>
              </h3>
            </div>
            <div className="flex items-center mb-4 md:w-[33%] text-start">
              <PicRightOutlined className="w-[32px] h-[32px] min-w-[32px] flex items-center justify-center rounded-full bg-[#EDE9FE] text-[#8B5CF6] text-20 svicon-calendar-alt" />
              <h3 className="ml-3">
                <p className="mr-1 text-se-neutral-64 text-[12px]">Thời gian thử việc</p>
                <p className="text-[14px]">{probationTime ? probationTime : '2 months'}</p>
              </h3>
            </div>
            <div className="flex items-center mb-4 md:w-[33%] text-start">
              <CompassOutlined className="w-[32px] h-[32px] min-w-[32px] flex items-center justify-center rounded-full bg-[#EDE9FE] text-[#8B5CF6] text-20 svicon-medal" />
              <h3 className="ml-3">
                <p className="mr-1 text-se-neutral-64 text-[12px]">Cấp bậc</p>
                <p className="text-[14px]">Nhân viên</p>
              </h3>
            </div>
          </div>
          <div className="md:flex md:border-b border-[#DDD6FE] mb-4">
            <div className="flex items-center mb-4 md:w-[33%] text-start">
              <TeamOutlined className="w-[32px] h-[32px] min-w-[32px] flex items-center justify-center rounded-full bg-[#EDE9FE] text-[#8B5CF6] text-20 svicon-venus-mars" />
              <h3 className="ml-3">
                <p className="mr-1 text-se-neutral-64 text-[12px]">Yêu cầu giới tính</p>
                <p className="text-[14px]">{sexual ? sexual : '-'}</p>
              </h3>
            </div>
            <div className="flex items-center mb-4 md:w-[33%] text-start">
              <UserAddOutlined className="w-[32px] h-[32px] min-w-[32px] flex items-center justify-center rounded-full bg-[#EDE9FE] text-[#8B5CF6] text-20 svicon-users" />
              <h3 className="ml-3">
                <p className="mr-1 text-se-neutral-64 text-[12px]">Số lượng tuyển</p>
                <p className="text-[14px]">{numberEmployees ? numberEmployees : 1}</p>
              </h3>
            </div>
            <div className="flex items-center mb-4 w-full md:w-[33%] text-start">
              <AppstoreOutlined className="w-[32px] h-[32px] min-w-[32px] flex items-center justify-center rounded-full bg-[#EDE9FE] text-[#8B5CF6] text-20 svicon-hard-hat" />
              <h3 className="ml-3">
                <p className="mr-1 text-se-neutral-64 text-[12px]">Hình thức làm việc</p>
                <p className="text-[14px]">{workWay}</p>
              </h3>
            </div>
          </div>
          <div className="md:flex md:border-b border-[#DDD6FE] mb-4">
            <div className="flex items-center mb-4 md:w-[33%] text-start">
              <InsertRowAboveOutlined className="w-[32px] h-[32px] min-w-[32px] flex items-center justify-center rounded-full bg-[#EDE9FE] text-[#8B5CF6] text-20 svicon-family" />
              <h3 className="ml-3">
                <p className="mr-1 text-se-neutral-64 text-[12px]">Độ tuổi</p>
                <p className="text-[14px]">{age ? age : 'Không đề cập'}</p>
              </h3>
            </div>
            <div className="flex items-center mb-4 w-full md:w-[33%] text-start">
              <FileDoneOutlined className="w-[32px] h-[32px] min-w-[32px] flex items-center justify-center rounded-full bg-[#EDE9FE] text-[#8B5CF6] text-20 svicon-graduation-cap" />
              <h3 className="ml-3">
                <p className="mr-1 text-se-neutral-64 text-[12px]">Yêu cầu bằng cấp</p>
                <p className="text-[14px]">{education ? education : 'Không đề cập'}</p>
              </h3>
            </div>
            <div className="flex items-center mb-4 w-full md:w-[33%] text-start">
              <CrownOutlined className="w-[32px] h-[32px] min-w-[32px] flex items-center justify-center rounded-full bg-[#EDE9FE] text-[#8B5CF6] text-20 svicon-experience-user" />
              <h3 className="ml-3">
                <p className="mr-1 text-se-neutral-64 text-[12px]">Yêu cầu kinh nghiệm</p>
                <p className="text-[14px]">{experience ? experience : 'Không đề cập'}</p>
              </h3>
            </div>
          </div>
          <div className="md:flex">
            <div className="flex items-center mb-4 w-full text-start">
              <DeploymentUnitOutlined className="w-[32px] h-[32px] min-w-[32px] flex items-center justify-center rounded-full bg-[#EDE9FE] text-[#8B5CF6] text-20 svicon-suitcase" />
              <h3 className="ml-3">
                <p className="mr-1 text-se-neutral-64 text-[12px]">Ngành nghề</p>
                <p className="text-[14px] text-se-accent font-semibold">
                  Vận hành - Bảo trì - Bảo dưỡng
                </p>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="text-start">
        <h2 className="text-[24px] font-semibold py-4">Mô tả công việc</h2>
        <div className="mb-2 text-[14px] font-normal break-words text-[#777779] text-description">
          {description && description !== 'None' ? description : 'Liên hệ để biết thêm thông tin'}
        </div>
      </div>
      <div className="text-start">
        <h2 className="text-[24px] font-semibold py-4">Yêu cầu công việc</h2>
        <div className="mb-2 text-[14px] font-normal break-words text-[#777779] text-description">
          {requirements && requirements !== 'None'
            ? requirements
            : 'Liên hệ để biết thêm thông tin'}
        </div>
      </div>
      <div className="text-start">
        <h2 className="text-[24px] font-semibold py-4">Quyền lợi</h2>
        <div className="mb-2 text-[14px] font-normal break-words text-[#777779] text-description">
          {right ? (
            right
          ) : (
            <>
              <p>
                - Mức lương từ 9 - 17 triệu (tùy thuộc vào kỹ năng và kinh nghiệm, được thỏa thuận
                cụ thể trong buổi phỏng vấn).
              </p>
              <p>
                - Môi trường làm việc chuyên nghiệp, năng động và thân thiện theo tiêu chuẩn của
                Công ty Nhật Bản.
              </p>
              <p>
                - Bảo hiểm xã hội, Bảo hiểm y tế, Bảo hiểm thất nghiệp, … theo quy định Luật Việt
                Nam, bảo hiểm sức khỏe và tai nạn 24/7.
              </p>
              <p>- Du lịch công ty hàng năm.</p>
              <p>- Khám sức khỏe định kỳ tại phòng khám hoặc bệnh viện quốc tế một lần mỗi năm.</p>
              <p>
                - Chính sách trả lương, tăng ca tuân thủ theo quy định Luật Việt Nam, cùng với trợ
                cấp lương thưởng và tăng lương theo quy định của Công ty và đánh giá năng lực hàng
                năm.
              </p>
              <p>- Được đào tạo kiến thức chuyên ngành.</p>
              <p>
                - Được trang bị đầy đủ phương tiện và dụng cụ bảo hộ lao động để đảm bảo an toàn
                công việc.
              </p>
            </>
          )}
        </div>
      </div>
      <div className="text-start">
        <h2 className="text-[24px] font-semibold py-4">Địa điểm làm việc</h2>
        <div className="mb-2 text-[14px] font-normal break-words text-[#777779] text-description">
          <p>
            {place ? place : ''} - {city ? city : ''}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center ">
          <span className="mr-4">Chia sẻ</span>
          <button
            className="flex items-center justify-center p-3 font-semibold"
            title="Chia sẻ Facebook">
            <FacebookOutlined />
          </button>
          <button
            className="ml-2 p-1"
            title="Sao chép liên kết">
            <ShareAltOutlined />
          </button>
          <button className="flex items-center justify-center py-3 px-auto text-14 rounded-sm w-full md:w-[152px] font-semibold md:ml-auto ml-3 border border-se-line border-0 text-primary w-auto ml-auto">
            <svg
              className="mr-1"
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 1.76367L13.959 9.92578C13.959 10.1081 13.9089 10.2767 13.8086 10.4316C13.7083 10.5775 13.5716 10.6823 13.3984 10.7461C12.8698 10.9557 12.3548 11.1152 11.8535 11.2246C11.3522 11.3249 10.8555 11.375 10.3633 11.375C9.88021 11.375 9.41081 11.3294 8.95508 11.2383C8.50846 11.1471 8.07552 11.0469 7.65625 10.9375C7.21875 10.8281 6.78125 10.7279 6.34375 10.6367C5.91536 10.5456 5.45052 10.5 4.94922 10.5C4.45703 10.5 3.98763 10.5456 3.54102 10.6367C3.0944 10.737 2.6888 10.8509 2.32422 10.9785C1.96875 11.097 1.66341 11.2109 1.4082 11.3203C1.15299 11.4388 0.97526 11.5208 0.875 11.5664V14.4375C0.875 14.556 0.829427 14.6562 0.738281 14.7383C0.65625 14.8294 0.55599 14.875 0.4375 14.875C0.31901 14.875 0.214193 14.8294 0.123047 14.7383C0.0410156 14.6562 0 14.556 0 14.4375V1.3125C0 1.19401 0.0410156 1.09831 0.123047 1.02539C0.214193 0.943359 0.31901 0.902344 0.4375 0.902344C0.55599 0.902344 0.65625 0.943359 0.738281 1.02539C0.829427 1.09831 0.875 1.19401 0.875 1.3125V1.92773C2.09635 1.43555 3.00781 1.13932 3.60938 1.03906C4.22005 0.929688 4.70768 0.875 5.07227 0.875C5.54622 0.875 5.97461 0.92513 6.35742 1.02539C6.74935 1.12565 7.12305 1.23958 7.47852 1.36719C7.80664 1.46745 8.13477 1.56315 8.46289 1.6543C8.79102 1.73633 9.15104 1.77734 9.54297 1.77734C9.98047 1.77734 10.4362 1.7181 10.9102 1.59961C11.3932 1.47201 11.9219 1.27604 12.4961 1.01172C12.5326 0.984375 12.6602 0.943359 12.8789 0.888672C13.1068 0.82487 13.3574 0.875 13.6309 1.03906C13.7585 1.11198 13.8496 1.2168 13.9043 1.35352C13.9681 1.48112 14 1.61784 14 1.76367ZM13.125 1.75C13.125 1.75 13.0293 1.79557 12.8379 1.88672C12.6374 1.97786 12.373 2.07812 12.0449 2.1875C11.7168 2.29688 11.3385 2.40169 10.9102 2.50195C10.4727 2.5931 10.0169 2.63867 9.54297 2.63867C9.07812 2.63867 8.65885 2.5931 8.28516 2.50195C7.91146 2.40169 7.55143 2.29232 7.20508 2.17383C6.86784 2.06445 6.5306 1.96875 6.19336 1.88672C5.86523 1.80469 5.49154 1.76367 5.07227 1.76367C4.58919 1.76367 4.0651 1.83203 3.5 1.96875C2.9349 2.09635 2.3151 2.29688 1.64062 2.57031L0.875 2.88477V10.6094L0.957031 10.582C1.66797 10.263 2.35156 10.026 3.00781 9.87109C3.66406 9.71615 4.3112 9.63867 4.94922 9.63867C5.50521 9.63867 6.02018 9.6888 6.49414 9.78906C6.9681 9.88021 7.42839 9.98503 7.875 10.1035C8.28516 10.2038 8.69076 10.2995 9.0918 10.3906C9.50195 10.4727 9.93034 10.5137 10.377 10.5137C10.8236 10.5137 11.2702 10.4681 11.7168 10.377C12.1634 10.2767 12.6283 10.1309 13.1113 9.93945V1.75H13.125Z"
                fill="#2C95FF"></path>
            </svg>
            Báo xấu
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostDetailBody;
