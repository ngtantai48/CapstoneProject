import { message } from 'antd';

class Notification {
  static success(text: string) {
    message.success(text);
  }

  static warning(text: string) {
    message.warning(text);
  }

  static error(text: string) {
    message.error(text);
  }
}

export default Notification;
