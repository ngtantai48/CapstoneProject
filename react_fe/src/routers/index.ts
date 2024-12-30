import routes from '@routers/routes';
import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFoundPage from '@pages/NotFoundPage';
import LayoutDefault from 'layout/main';
import Post from '@pages/post';
import SearchJob from '@pages/search-job';
import ProfileUser from '@pages/ProfileUser';
import Admin from '@pages/admin';
import AIJob from '@pages/ai-job';
import ForgotPassword from '@pages/forgot-password';
const Routers: Types.IRoute[] = [
  {
    key: 1,
    path: routes.HOME,
    component: Home,
    isAdmin: false,
    layout: LayoutDefault,
  },
  {
    key: 2,
    path: routes.LOGIN,
    component: Login,
    isAdmin: false,
  },
  {
    key: 3,
    path: routes.POST_DETAIL,
    component: Post,
    isAdmin: false,
    layout: LayoutDefault,
  },
  {
    key: 4,
    path: routes.POST_SEARCH,
    component: SearchJob,
    isAdmin: false,
    layout: LayoutDefault,
  },
  {
    key: 5,
    path: routes.PROFILE_USER,
    component: ProfileUser,
    isProtected: true,
    isAdmin: false,
    layout: LayoutDefault,
  },
  {
    key: 6,
    path: routes.ADMIN,
    component: Admin,
    isProtected: true,
    isAdmin: true,
    layout: LayoutDefault,
  },
  {
    key: 7,
    path: routes.AI_JOB,
    component: AIJob,
    isProtected: true,
    isAdmin: false,
    layout: LayoutDefault,
  },
  {
    key: 8,
    path: routes.FORGOT_PASSWORD,
    component: ForgotPassword,
    isProtected: false,
    isAdmin: false,
    layout: null,
  },
  {
    key: 404,
    path: routes.NOTFOUND,
    component: NotFoundPage,
    isAdmin: false,
  },
];

export default Routers;
