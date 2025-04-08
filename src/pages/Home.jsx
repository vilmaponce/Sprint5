import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const navigate = useNavigate();
  const fullText = "¡Bienvenido a la Galaxia de Mascotas!\n\nEncuentra tu mascota interestelar perfecta entre las estrellas. 🚀🐾";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Velocidad de escritura

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen p-6 text-center overflow-hidden flex items-center justify-center">
      {/* Video de fondo */}
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

      {/* Estrellas decorativas */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.7 + 0.3
          }}
        />
      ))}

      {/* Contenido principal */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="font-space text-center">
          {/* Título principal */}
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 animate-float">
            Galaxia de Mascotas
          </h1>
          
          {/* Texto animado con contenedor de altura fija y scroll */}
          <div className="text-lg md:text-xl text-blue-100 font-orbitron tracking-wide leading-relaxed h-48 md:h-56 overflow-y-auto custom-scrollbar">
            {displayText.split('\n').map((line, i) => (
              <p key={i} className="mb-4 animate-fadeIn">{line || <br />}</p>
            ))}
          </div>
          
          {/* Botón que redirige a /pets */}
          <button 
            onClick={() => navigate('/pets')}
            className="mt-12 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-pulse-slow"
          >
            Explorar Mascotas
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;