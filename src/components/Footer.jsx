import { useState, useEffect } from 'react';

const Footer = () => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  
  const phrases = [
    "Explorando el universo de las mascotas cósmicas 🌟",
    "Conectando amantes de mascotas por toda la galaxia 🤍",
    "Donde cada mascota tiene su constelación 🎇",
    "Adopciones que trascienden sistemas solares 🌞",
    "Trazando rutas estelares para compañeros peludos 🌠"
  ];

  useEffect(() => {
    // Cambia la frase cada 5 segundos (opcional)
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * phrases.length);
      setCurrentPhrase(phrases[randomIndex]);
    }, 2000);
    
    // Frase inicial
    setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gradient-to-r from-purple-900 to-blue-800 text-white py-6">
      <div className="container mx-auto px-4">
        
        {/* Logo y marca */}
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-lg">🌠</span>
            </div>
            <span className="text-lg font-bold">Mascotas Interestelares</span>
          </div>
          
          {/* Frase del día */}
          <p className="text-xl text-purple-200 bold mb-3 text-center min-h-[20px] transition-opacity duration-500">
            {currentPhrase}
          </p>
          
          {/* Derechos y creador */}
          <div className="text-center text-xs opacity-80">
            <p>© {new Date().getFullYear()} Viaje a las Estrellas Digitales</p>
            <p className="mt-1 flex items-center justify-center">
              <span className="mr-1">👩‍🚀</span>
              Comandante Vilma Ponce
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  