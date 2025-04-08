// src/pages/PetList.jsx
import { useContext } from 'react';
import { PetContext } from '../context/PetContext';
import PetCard from '../components/PetCard';



const PetList = () => {
  const { pets, loading } = useContext(PetContext);

  if (loading) return <div>Cargando mascotas...</div>;
  if (!pets.length) return <div>No hay mascotas registradas</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black bg-opacity-50 relative">
      {/* Video de fondo (con estilos reforzados) */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed top-0 left-0 w-full h-full object-cover opacity-30 z-0"
    >
      <source src="/video/galaxia.mp4" type="video/mp4" />
      Tu navegador no soporta videos.
    </video>
      {pets.map(pet => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;