import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-purple-500 to-blue-300 shadow-lg">
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1471&auto=format&fit=crop')] opacity-20 animate-pan-right"></div>

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
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 group-hover:rotate-12 transition-transform duration-500">
              {/* Planeta */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 z-10"></div>

              {/* Anillos */}
              <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-white/30 transform -translate-x-1/2 -translate-y-1/2 rotate-30 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-white/30 transform -translate-x-1/2 -translate-y-1/2 rotate-60 rounded-full"></div>

              {/* Detalle */}
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/80"></div>
            </div>
            <span className="text-2xl font-bold text-white drop-shadow-md">Mascotas Interestelares</span>
          </Link>

          {/* Botón hamburguesa premium */}
          <button
            className="md:hidden relative w-10 h-10 focus:outline-none group cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú de navegación"
            aria-expanded={isMenuOpen}
          >
            <div className={`absolute top-1/2 left-1/2 w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white w-full h-full">
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={`absolute top-1/2 left-1/2 w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white w-full h-full">
                <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

          {/* Menú normal - SOLO visible en desktop */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-white hover:text-pink-300 transition-colors font-medium">Inicio</Link>
            <Link to="/pets" className="text-white hover:text-pink-300 transition-colors font-medium">Mascotas</Link>
            <Link to="/pets/create" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-full transition-all font-medium">
              + Agregar
            </Link>
          </nav>
        </div>

        {/* Menú móvil */}
        <div className={`md:hidden bg-gradient-to-b from-purple-800 to-blue-800 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link
              to="/"
              className="text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/pets"
              className="text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Mascotas
            </Link>
            <Link
              to="/pets/create"
              className="mt-2 mb-4 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-center text-white font-medium text-lg shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              + Agregar Mascota
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;