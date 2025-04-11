import { usePetContext } from '../context/PetContext';

const AdoptedPets = () => {
  const { adoptedPets } = usePetContext();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Mis Mascotas Adoptadas
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            {adoptedPets.length} compañeros estelares
          </p>
        </div>

        {adoptedPets.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No hay adopciones aún</h3>
            <p className="mt-1 text-gray-500">Las mascotas que adoptes aparecerán aquí</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adoptedPets.map((pet) => (
              <div key={pet.id} className="bg-white overflow-hidden shadow rounded-lg border-2 border-green-100 hover:border-green-300 transition-all">
                <div className="relative h-48 w-full">
                  <img
                    className="h-full w-full object-cover"
                    src={pet.image || '/default-pet.jpg'}
                    alt={pet.name}
                    onError={(e) => {
                      e.target.src = '/default-pet.jpg';
                    }}
                  />
                  <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Adoptado
                  </span>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{pet.name}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Especie:</span> {pet.species}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Fecha adopción:</span> {new Date(pet.adoptedAt).toLocaleDateString()}
                    </p>
                    {pet.adoptionRecord && (
                      <>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Adoptante:</span> {pet.adoptionRecord.adopterName}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Contacto:</span> {pet.adoptionRecord.adopterEmail}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptedPets;