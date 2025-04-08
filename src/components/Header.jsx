import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-purple-900 to-blue-900 shadow-lg">
      {/* Fondo animado de estrellas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1471&auto=format&fit=crop')] opacity-20 animate-pan-right"></div>
        
        {/* Estrellas animadas */}
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

      {/* Contenido del header (sobrepuesto al fondo) */}
      <div className="relative z-10 container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          {/* Logo con planeta animado */}
          <div className="relative">
            <div className="w-10 h-10 bg-blue-400 rounded-full group-hover:rotate-180 transition-transform duration-1000">
              <div className="absolute top-2 left-2 w-6 h-6 bg-purple-300 rounded-full"></div>
            </div>
          </div>
          <span className="text-2xl font-bold text-white drop-shadow-md">Mascotas Interestelares</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-pink-300 transition-colors font-medium">Inicio</Link>
          <Link to="/pets" className="text-white hover:text-pink-300 transition-colors font-medium">Mascotas</Link>
          <Link to="/pets/create" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-full transition-all font-medium">
            + Agregar
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;