import { toast } from 'react-toastify';

const option = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const onError = message => {
  toast.error(message, option);
};

export const onWarning = message => {
  toast.warn(message, option);
};

export const onSuccess = message => {
  toast.success(message, option);
};
