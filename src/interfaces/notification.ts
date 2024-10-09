export interface ToastCodeProps {
    position?: string;
    disableAutoClose?: boolean;
    autoClose?: boolean | number;
    hideProgressBar?: boolean;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
    type?: string;
    draggable?: boolean;
    progress?: number;
    transition?: string;
  }
  
  export interface NotificationProps {
    type: string;
    message?: string;
    timeout?: number;
  }