import GalaxyBackground from "../components/GalaxyBackground"

const NotFound = () => (
    <GalaxyBackground>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-400/10 via-[#2a1b45] to-indigo-600/10 opacity-80"></div>
      <div className="absolute inset-0">
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
    <div className="text-center p-10">
      <h1 className="text-8xl text-white font-bold">404</h1>
      <p className="text-xl mt-4 text-white">¡Alien perdido! Página no encontrada 👽</p>
    </div>

    </div>
    </GalaxyBackground>
        
  
  )
  export default NotFound
  