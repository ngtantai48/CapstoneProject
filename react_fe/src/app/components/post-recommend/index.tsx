const PostRecommend = () => {
  return (
    <div className="px-4 md:px-0 top-4 pb-2">
      <h2 className="text-[24px] md:text-[18px] mt-4 md:mt-0 font-semibold">
        Việc làm tương tự cho bạn
      </h2>
      <div className="my-3 w-[80px] h-1 bg-primary"></div>
      <div>
        <div className="relative w-full p-2 gap-1 bg-white rounded border border-solid border-se-blue-10 mb-2">
          <a
            className="relative flex"
            target="_blank"
            href="/dien-dien-tu-dien-lanh/thuc-tap-sinh-ky-thuat-han-lam-viec-tai-nhat-ban-c41p122id200337668.html?open_from=0601_1_1">
            <div className="relative mt-1 rounded-sm border flex w-[32px] flex-shrink-0 h-[32px] mx-auto">
              <div className="relative my-auto rounded-sm">
                <img
                  className="relative rounded-sm object-contain w-full h-auto max-h-full"
                  alt="Chi Nhánh Công Ty TNHH Rtech"
                  src="https://cdn1.vieclam24h.vn/images/employer_avatar/2024/03/12/293172791_496756335784658_2936924664967689703_n_171022644123.png?v=220513"
                  title="Chi Nhánh Công Ty TNHH Rtech"
                />
              </div>
            </div>
            <div className="text-black w-full overflow-hidden relative font-medium col-span-5 ml-1">
              <div className="pb-2 relative w-11/12">
                <div className="flex relative items-center justify-between">
                  <div className="truncate relative">
                    <div className="flex relative items-center gap-1 flex-1 overflow-hidden">
                      <h3
                        title="Thực Tập Sinh Kỹ Thuật Hàn Làm Việc Tại Nhật Bản"
                        className="font-medium text-13 truncate my-0">
                        Thực Tập Sinh Kỹ Thuật Hàn Làm Việc Tại Nhật Bản
                      </h3>
                    </div>
                  </div>
                </div>
                <h3
                  className="relative text-13 text-grey-50 truncate my-0"
                  title="Chi Nhánh Công Ty TNHH Rtech">
                  Chi Nhánh Công Ty TNHH Rtech
                </h3>
              </div>
              <div className="flex flex-col text-left text-xs space-y-1">
                <div className="flex">
                  <div className="flex items-center mr-3 relative text-left text-xs province-tooltip">
                    <i className="text-se-neutral-24 mr-1 text-se-neutral-48-n mr-4 svicon-map-marker-alt-s"></i>
                    <span className="text-se-neutral-80 whitespace-nowrap text-14 text-12 !text-black">
                      TP.HCM
                    </span>
                    <span className="tooltip-content">TP.HCM</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 font-normal text-xs">
                  <span className="text-se-neutral-48-n mr-3 svicon-dollar-sign-im"></span>
                  <span className="text-12 whitespace-nowrap font-medium">30 - 38 triệu</span>
                </div>
                <div className="inline-flex items-center gap-1 font-normal text-xs">
                  <span className="text-se-neutral-48-n mr-3 svicon-briefcase"></span>
                  <span className="text-12 whitespace-nowrap font-medium">2 năm</span>
                </div>
              </div>
            </div>
          </a>
          <span className="svicon-heart cursor-pointer absolute right-2 top-3 text-se-accent-100 ml-1"></span>
        </div>
      </div>
    </div>
  );
};

export default PostRecommend;
