// components/GalaxyBackground.jsx
const GalaxyBackground = ({ children }) => {
    // Genera 50 estrellas aleatorias
    const stars = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        size: Math.random() * 3,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random(),
        animationDelay: `${Math.random() * 5}s`
    }));

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Video de galaxia */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed top-0 left-0 w-full h-full object-cover opacity-30 -z-20"
            >
                <source src="/videos/galaxy.mp4" type="video/mp4" />
            </video>

            {/* Estrellas animadas */}
            <div className="fixed inset-0 -z-10">
                {stars.map(star => (
                    <div
                        key={star.id}
                        className="absolute rounded-full bg-white animate-twinkle"
                        style={{
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            left: star.left,
                            top: star.top,
                            opacity: star.opacity,
                            animationDelay: star.animationDelay
                        }}
                    />
                ))}
            </div>

            {/* Contenido */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default GalaxyBackground;