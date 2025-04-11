import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../context/PetContext';
import Swal from 'sweetalert2';
import AdoptionModal from './AdoptionModal';

const PetCard = ({ pet, onAdoptionSuccess }) => {
  const { removePet, adoptPet } = useContext(PetContext);
  const navigate = useNavigate();
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [isAdopted, setIsAdopted] = useState(pet.isAdopted);

  const handleViewDetails = () => {
    if (!showAdoptionModal) {
      navigate(`/pets/${pet.id}`);
    }
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

  const handleAdopt = (e) => {
    e.stopPropagation();
    setShowAdoptionModal(true);
  };

  const handleAdoptionSuccess = async (formData) => {
    try {
      // Usamos el método adoptPet del contexto que actualiza todo
      await adoptPet(pet.id, formData);
      
      setIsAdopted(true);
      onAdoptionSuccess?.(); // Notificar al componente padre si es necesario
      
      Swal.fire({
        title: '¡Familia encontrada!',
        html: `
          <div class="text-center">
            <p class="text-lg">${pet.name} tiene nuevo hogar</p>
            <div class="mt-4 p-3 bg-green-100 rounded-lg">
              <p class="text-green-800">¡Adopción confirmada!</p>
            </div>
          </div>
        `,
        icon: 'success'
      });
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al completar la adopción', 'error');
    } finally {
      setShowAdoptionModal(false);
    }
  };

  return (
    <>
      <div 
        onClick={handleViewDetails}
        className={`relative w-64 h-96 mx-2 my-4 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border-2 ${isAdopted ? 'border-green-500 bg-gray-800/30' : 'border-gray-700 bg-gray-800/50'} backdrop-blur-sm`}
      >
        {/* Efecto de adopción */}
        {isAdopted && (
          <div className="absolute inset-0 bg-green-900/10 z-10 flex items-center justify-center">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-12">
              ¡ADOPTADO!
            </span>
          </div>
        )}

        {/* Contenido de la card */}
        <div className="relative h-full">
          {/* Imagen */}
          <div className="relative h-2/3 w-full overflow-hidden">
            <img
              src={pet.image || '/default-pet.jpg'}
              alt={pet.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${isAdopted ? 'opacity-80' : 'group-hover:scale-105'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>

          {/* Botones */}
          <div className="absolute top-2 right-2 flex space-x-2">
            {!isAdopted && (
              <button 
                onClick={handleAdopt}
                className="p-2 bg-green-600 hover:bg-green-500 rounded-full transition-colors z-10"
                aria-label="Adoptar mascota"
              >
                <span className="text-white">Adoptar</span>
              </button>
            )}
            <button 
              onClick={handleEdit}
              className="p-2 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors z-10"
              aria-label="Editar mascota"
            >
              <span className="text-white">Editar</span>
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 bg-red-600 hover:bg-red-500 rounded-full transition-colors z-10"
              aria-label="Eliminar mascota"
            >
              <span className="text-white">Eliminar</span>
            </button>
          </div>

          {/* Info */}
          <div className="relative h-1/3 p-4 flex flex-col justify-between text-left text-gray-200">
            <div>
              <h3 className={`text-xl font-bold truncate ${isAdopted ? 'text-green-400' : 'text-white'}`}>
                {pet.name}
              </h3>
              <div className="flex items-center mt-1">
                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                  pet.species === 'Perro' ? 'bg-yellow-400' :
                  pet.species === 'Gato' ? 'bg-blue-400' :
                  'bg-purple-400'
                }`}></span>
                <span className="text-sm text-gray-300">
                  {pet.species} • {pet.planet}
                </span>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-sm">
                <span className={isAdopted ? 'text-gray-400' : 'text-gray-300'}>Edad: {pet.age} años</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  isAdopted ? 'bg-green-500/30 text-green-300' : 'bg-red-500/20 text-red-400'
                }`}>
                  {isAdopted ? 'Adoptado' : 'Disponible'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de adopción */}
      {showAdoptionModal && (
        <AdoptionModal 
          pet={pet} 
          onClose={() => setShowAdoptionModal(false)}
          onSuccess={handleAdoptionSuccess} // Pasamos la función que usa el contexto
        />
      )}
    </>
  );
};

export default PetCard;