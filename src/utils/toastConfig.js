import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configuración global (ahora se hace con ToastContainer en el componente)
// Elimina toast.configure() - ya no es necesario

/**
 * Muestra una notificación de éxito
 * @param {string} message - Mensaje a mostrar
 */
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'bg-green-600 text-white',
    bodyClassName: 'font-sans text-sm',
  });
};

/**
 * Muestra una notificación de error
 * @param {string} message - Mensaje a mostrar
 */
export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'bg-red-600 text-white',
    bodyClassName: 'font-sans text-sm',
  });
};