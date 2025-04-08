const LoadingPlanet = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin"></div>
          <div className="absolute inset-4 rounded-full bg-gray-900"></div>
          <div className="absolute inset-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
        </div>
        <p className="mt-8 text-xl text-white animate-pulse">Cargando datos interestelares...</p>
      </div>
    );
  };
  
export default LoadingPlanet;