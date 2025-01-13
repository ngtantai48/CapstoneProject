const BASE_API_URL = {
  SIGNUP: '/api/v1/auth/register',
  LOGIN: '/api/v1/auth/login',
};

const POST_API_URL = {
  POST: '/api/v1/crawl/',
  POST_ADMIN: '/api/v1/crawl/admin',
  STATUS: '/api/v1/crawl/status/',
};

const USER_API_URL = {
  CHANGE_PASSWORD: '/api/v1/auth/change-password',
  PROFILE: '/api/v1/user',
  UPDATE_PROFILE: '/api/v1/user/me',
  USER_SKILL: '/api/v1/user/skill',
  USER_SAVE_POST: '/api/v1/user/save-post',
  USER: '/api/v1/user',
  FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
  RESET_PASSWORD: '/api/v1/auth/update-forgot-password',
  MAIL_SUBSCRIBE: '/api/v1/mail-schedule',
};

const ANALYZE_API_URL = {
  USER: '/api/v1/analyze/user',
  CRAWL: '/api/v1/analyze/crawl',
};

const CRAWL_API_URL = {
  ON_CRAWL_DATA: '/crawl/trigger',
};

const PREDICT_API_URL = {
  JOB_OPPORTUNITY: '/ai/api/v1/job_future',
  JOB_HISTORICAL: '/ai/api/v1/job_history',
};

export {
  BASE_API_URL,
  POST_API_URL,
  USER_API_URL,
  ANALYZE_API_URL,
  CRAWL_API_URL,
  PREDICT_API_URL,
};
