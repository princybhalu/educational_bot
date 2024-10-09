import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastCodeProps, NotificationProps } from '../../interfaces/notification';
import { DEFAULT_NOTIFICATION_DISPLAY_TIME } from '../../constants/constants';

export const NOTIFICATION_TYPE_SUCCESS = 'success';
export const NOTIFICATION_TYPE_ERROR = 'error';
export const NOTIFICATION_TYPE_INFO = 'info';
export const NOTIFICATION_TYPE_WARN = 'warn';



export function Notification({
  type,
  message,
  timeout = DEFAULT_NOTIFICATION_DISPLAY_TIME,
}: NotificationProps) {
  
  const toastOptions: ToastCodeProps = {
    position: 'top-center',
    autoClose: timeout,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  };

  switch (type) {
    case NOTIFICATION_TYPE_SUCCESS:
      // @ts-ignore
      toast.success(message, { ...toastOptions });
      break;
    case NOTIFICATION_TYPE_ERROR:
      // @ts-ignore
      toast.error(message, { ...toastOptions });
      break;
    case NOTIFICATION_TYPE_INFO:
      // @ts-ignore
      toast.info(message, { ...toastOptions });
      break;
    case NOTIFICATION_TYPE_WARN:
      // @ts-ignore
      toast.warn(message, { ...toastOptions });
      break;
    default:
      // // @ts-ignore
      // toast('🦄 Wow so easy!', toastOptions);
      break;
  }
  return null;
}

function NotificationWrapper() {
  return (
    <ToastContainer
      role="alert"
      transition={Slide}
    //   closeButton={<button className={'Toastify__close-button'}><NotificationCloseIcon /></button>}
    />
  );
}
export default NotificationWrapper;