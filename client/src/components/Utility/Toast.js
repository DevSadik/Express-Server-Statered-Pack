import { toast } from 'react-toastify';

export const createToast = ( msg ) => {
    return toast.error(msg)
};