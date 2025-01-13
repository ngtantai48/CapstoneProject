// src/components/Header.js
import { UserOutlined } from '@ant-design/icons';
import MenuProfile from '@components/menu-profile';
import { NotificationIcon } from '@themes';
import { getLocalStorage, STORAGE } from '@utils/helpers';
import useAuthForm from 'app/hooks/useAuthForm';
import { useMemo, useState } from 'react';
import { WrapperStyled } from './styled';
const Header = () => {
  const { openAuthForm, AuthFormElement } = useAuthForm();
  const USER_DATA = useMemo(() => {
    const localStorageData = getLocalStorage(STORAGE.USER_DATA);
    return localStorageData ? JSON.parse(localStorageData) : null;
  }, []);
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState<boolean>(false);
  const handleOpenSignIn = () => {
    openAuthForm(true);
  };
  const handleOpenSignUp = () => {
    openAuthForm(false);
  };
  return (
    <>
      <AuthFormElement />
      <WrapperStyled>
        <header className="bg-white text-black w-full">
          <div className="flex justify-between items-center p-4 w-full">
            <div className="flex justify-between items-center">
              <a
                className="text-xl font-bold w-[10rem]"
                href="/home">
                Career Connect
              </a>
              <nav className="flex space-x-4">
                <div className="hover:text-gray-400 cursor-pointer">
                  <a href="/search-job">Find jobs</a>
                </div>
                {/* <div className="hover:text-gray-400 cursor-pointer">
                  <a href="/ai/salary">VietnamSalary</a>
                </div> */}
                <div className="hover:text-gray-400 cursor-pointer">
                  <a href="/ai-predict/job-opportunity">Career Opportunity</a>
                </div>
              </nav>
            </div>
            {USER_DATA ? (
              <div className="flex justify-between items-center">
                <div className="hover:text-gray-400 cursor-pointer">
                  <NotificationIcon />
                </div>
                <button>
                  <img
                    src={USER_DATA.avatar.url}
                    className="w-9 h-9 ml-4 rounded-full"
                    alt="avatarUser"
                    onClick={() => setIsOpenProfileMenu(!isOpenProfileMenu)}
                  />
                  {isOpenProfileMenu && <MenuProfile />}
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center w-36">
                <div className="flex hover:text-gray-400 cursor-pointer w-[5.5rem] justify-between">
                  <div className="w-[26px] h-[26px] rounded-[50px] bg-[#5d677a] text-white flex justify-center items-center">
                    <UserOutlined />
                  </div>
                  <a onClick={handleOpenSignIn}>Sign up</a>
                </div>
                <div className="hover:text-gray-400 cursor-pointer">
                  <a onClick={handleOpenSignUp}>Login</a>
                </div>
              </div>
            )}
          </div>
        </header>
        <div className="border-bottom"></div>
      </WrapperStyled>
    </>
  );
};

export default Header;
