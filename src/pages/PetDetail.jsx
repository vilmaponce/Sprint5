import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PetContext } from '../context/PetContext';
import Swal from 'sweetalert2';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets, removePet } = useContext(PetContext);
  const pet = pets.find(p => p.id === id);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Eliminar mascota?',
      text: `¿Estás seguro de eliminar a ${pet?.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#1f2937',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        await removePet(id);
        Swal.fire({
          title: '¡Eliminada!',
          text: 'La mascota fue eliminada.',
          icon: 'success',
          background: '#1f2937',
          color: '#fff'
        });
        navigate('/pets');
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar',
          icon: 'error',
          background: '#1f2937',
          color: '#fff'
        });
      }
    }
  };

  if (!pet) return <div className="text-center py-12 text-white">Mascota no encontrada</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/pets')}
          className="mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white"
        >
          ← Volver a la lista
        </button>

        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          <div className="h-96 w-full relative overflow-hidden">
            <img
              src={pet.image || '/default-pet.jpg'}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white">{pet.name}</h1>
                <div className="flex items-center mt-2">
                  <span className={`inline-block w-4 h-4 rounded-full mr-2 ${
                    pet.species === 'Perro' ? 'bg-yellow-400' :
                    pet.species === 'Gato' ? 'bg-blue-400' :
                    pet.species === 'Ave' ? 'bg-red-400' :
                    pet.species === 'Reptil' ? 'bg-green-400' : 'bg-purple-400'
                  }`}></span>
                  <span className="text-lg text-gray-300">
                    {pet.species} • {pet.planet}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                pet.isAdopted ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {pet.isAdopted ? 'Adoptado' : 'Disponible'}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Información Básica</h3>
                <p className="text-gray-300"><span className="font-medium">Edad:</span> {pet.age} años</p>
                <p className="text-gray-300"><span className="font-medium">Planeta:</span> {pet.planet}</p>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Detalles</h3>
                <p className="text-gray-300"><span className="font-medium">Temperamento:</span> {pet.temperament || 'No especificado'}</p>
                <p className="text-gray-300"><span className="font-medium">Tamaño:</span> {pet.size || 'No especificado'}</p>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => navigate(`/pets/${pet.id}/edit`)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
              >
                Editar Mascota
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"
              >
                Eliminar Mascota
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;