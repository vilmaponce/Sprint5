import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../context/PetContext';

const PetCard = ({ pet }) => {
  const { removePet } = useContext(PetContext);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/pets/${pet.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/pets/${pet.id}/edit`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const result = await Swal.fire({
      title: '¿Eliminar mascota?',
      text: `¿Estás seguro de eliminar a ${pet.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await removePet(pet.id);
        Swal.fire('¡Eliminada!', `${pet.name} fue eliminada.`, 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la mascota', 'error');
      }
    }
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="relative w-64 h-96 mx-2 my-4 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group bg-gray-800/50 border border-gray-700 backdrop-blur-sm"
    >
      {/* Fondo con efecto interestelar */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-800 to-green-900 opacity-90"></div>
      
      {/* Imagen de la mascota */}
      <div className="relative h-2/3 w-full overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <img
          src={pet.image || '/default-pet.jpg'}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Botones de acción */}
        <div className="absolute top-2 right-2 flex space-x-2">
          <button 
            onClick={handleEdit}
            className="p-2 bg-blue-600/80 hover:bg-blue-500 rounded-full transition-colors duration-200"
            aria-label="Editar mascota"
            title="Editar"
          >
            <span className="text-white">Editar</span>
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 bg-red-600/80 hover:bg-red-500 rounded-full transition-colors duration-200"
            aria-label="Eliminar mascota"
            title="Eliminar"
          >
            <span className="text-white">Eliminar</span>
          </button>
        </div>
      </div>
      
      {/* Contenido de la card */}
      <div className="relative h-1/3 p-4 flex flex-col justify-between text-left text-gray-200">
        {/* Nombre y especie */}
        <div>
          <h3 className="text-xl font-bold text-white truncate">{pet.name}</h3>
          <div className="flex items-center mt-1">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
              pet.species === 'Perro' ? 'bg-yellow-400' :
              pet.species === 'Gato' ? 'bg-blue-400' :
              pet.species === 'Ave' ? 'bg-red-400' :
              pet.species === 'Reptil' ? 'bg-green-400' : 'bg-purple-400'
            }`}></span>
            <span className="text-sm text-gray-300">
              {pet.species} • {pet.planet}
            </span>
          </div>
        </div>
        
        {/* Estado y detalles */}
        <div className="mt-2">
          <div className="flex justify-between text-sm text-gray-300">
            <span>Edad: {pet.age} años</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              pet.isAdopted ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {pet.isAdopted ? 'Adoptado' : 'Disponible'}
            </span>
          </div>
          
          {/* Efecto especial hover */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;