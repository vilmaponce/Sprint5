const GalaxyBackground = ({ children }) => {
    // Genera 100 estrellas aleatorias
    const stars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random(),
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`
    }));
  
    return (
      <div className="relative min-h-screen bg-gray-900 overflow-hidden">
        {/* Estrellas animadas */}
        <div className="fixed inset-0 -z-10">
          {stars.map(star => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-star-twinkle"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                left: star.left,
                top: star.top,
                opacity: star.opacity,
                animationDelay: star.animationDelay,
                animationDuration: star.animationDuration
              }}
            />
          ))}
        </div>
  
        {/* Contenido (tus formularios) */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  };
  
  export default GalaxyBackground;