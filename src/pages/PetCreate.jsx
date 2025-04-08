import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PetContext } from '../context/PetContext';
import PetForm from '../components/PetForm';
import { showSuccessToast, showErrorToast } from '../utils/toastConfig';

const PetCreate = () => {
  const { addPet } = useContext(PetContext);
  const navigate = useNavigate();

  // Configuración de estrellas (150 para mejor cobertura)
  const stars = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    size: Math.random() * 1.5 + 0.5, // Tamaño más pequeño
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.5 + 0.3, // Brillo moderado
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 3 + 2}s`
  }));

  // Meteoritos mejorados (5 con diferentes características)
  const meteors = [
    { id: 1, top: '20%', delay: '0s', duration: '4s', size: '2px', color: 'rgba(255,200,200,0.8)' },
    { id: 2, top: '35%', delay: '6s', duration: '3s', size: '1px', color: 'rgba(200,220,255,0.9)' },
    { id: 3, top: '60%', delay: '12s', duration: '5s', size: '3px', color: 'rgba(255,220,180,0.7)' },
    { id: 4, top: '75%', delay: '8s', duration: '3.5s', size: '1.5px', color: 'rgba(200,255,220,0.6)' },
    { id: 5, top: '45%', delay: '15s', duration: '4.5s', size: '2.5px', color: 'rgba(220,180,255,0.8)' }
  ];

  const handleSubmit = async (petData) => {
    try {
      await addPet(petData);
      showSuccessToast('Mascota creada exitosamente');
      navigate('/pets');
    } catch (error) {
      showErrorToast('Error al crear mascota');
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#2a1b45]">
      {/* Fondo nebulosa lila */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-400/10 via-[#2a1b45] to-indigo-600/10 opacity-80"></div>
      
      {/* Capa de estrellas */}
      <div className="absolute inset-0">
        {stars.map(star => (
          <div
            key={`star-${star.id}`}
            className="absolute bg-white rounded-full animate-star-twinkle"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: star.left,
              top: star.top,
              opacity: star.opacity,
              animationDelay: star.delay,
              animationDuration: star.duration
            }}
          />
        ))}
      </div>

      {/* Meteoritos realistas */}
      <div className="absolute inset-0 overflow-hidden">
        {meteors.map(meteor => (
          <div
            key={`meteor-${meteor.id}`}
            className="absolute meteor animate-meteor"
            style={{
              top: meteor.top,
              height: meteor.size,
              background: `linear-gradient(90deg, transparent, ${meteor.color}, transparent)`,
              animationDelay: meteor.delay,
              animationDuration: meteor.duration,
              filter: `drop-shadow(0 0 2px ${meteor.color})`
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <div className="py-8 px-4">
          <h1 className="text-3xl font-bold text-white text-center drop-shadow-lg mb-6">
            Crear Nueva Mascota Interestelar
          </h1>
        </div>

        <div className="flex justify-center items-center p-4">
          <div className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 shadow-lg">
            <PetForm 
              onSubmit={handleSubmit}
              submitText="Crear Mascota"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCreate;