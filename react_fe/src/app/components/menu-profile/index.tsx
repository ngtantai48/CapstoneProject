import { getLocalStorage, removeLocalStorage, STORAGE } from '@utils/helpers';
import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
const MenuProfile = () => {
  const USER_DATA = useMemo(() => {
    const localStorageData = getLocalStorage(STORAGE.USER_DATA);
    return localStorageData ? JSON.parse(localStorageData) : null;
  }, []);
  const handleLogout = useCallback(() => {
    removeLocalStorage(STORAGE.USER_TOKEN);
    removeLocalStorage(STORAGE.USER_REFRESH);
    removeLocalStorage(STORAGE.USER_DATA);
    window.location.href = '/home';
  }, []);
  return (
    <div className="p-0 transition-all z-10 absolute right-2 top-16 bg-white rounded-lg p-2 shadow-[0px_1px_7px_0px_#7E818E52]">
      <Link
        to={USER_DATA.role === 'user' ? `/profile-user/${USER_DATA?.id}` : '/admin'}
        className="flex items-center p-2 hover:bg-[#f3f4f6] dark:hover:bg-slate-200 rounded-lg mb-2">
        <div className="user-avatar w-[32px]  h-[32px] mr-4">
          <img
            src={USER_DATA.avatar.url}
            alt=""
            className="block w-full h-full rounded-full"
          />
        </div>
        <div className="user-name ">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-800">
            {USER_DATA.name}
          </p>
          <span className="text-xs text-slate-400">{USER_DATA.email}</span>
        </div>
      </Link>
      <hr className="mb-2" />
      <Link
        to="/setting"
        className="flex items-center p-2 hover:bg-[#f3f4f6] dark:hover:bg-slate-200 rounded-lg">
        <svg
          fill="currentColor"
          className="w-[26px] h-[26px] mr-[10px] text-slate-700"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"></path>
        </svg>
        <span className="text-slate-600"> Setting</span>
      </Link>
      <a
        onClick={handleLogout}
        className="flex items-center p-2 hover:bg-[#f3f4f6] dark:hover:bg-slate-200 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="w-[26px] h-[26px] mr-[10px] text-slate-700 dark:text-slate-800"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        <span className="text-slate-600 dark:text-slate-800">Log out</span>
      </a>
    </div>
  );
};

export default MenuProfile;
