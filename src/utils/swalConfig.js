import Swal from 'sweetalert2';

export const confirmDelete = () => {
  return Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    background: '#1f2937',
    color: '#fff'
  });
};


export const showErrorAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    background: '#1f2937',
    color: '#fff',
    confirmButtonColor: '#7c3aed'
  });
};