import { useState, useEffect } from 'react';

const StarCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [twinkle, setTwinkle] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [touchActive, setTouchActive] = useState(false);

  useEffect(() => {
    // Detectar si es un dispositivo táctil
    const touchDetected = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchDetected);
    
    const moveCursor = (e) => {
      // Para eventos táctiles, usa las coordenadas del touch
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
      
      if (clientX && clientY) {
        setPosition({ x: clientX, y: clientY });
      }
    };

    const checkHover = (e) => {
      if (isTouchDevice) return;
      
      const hoverElements = [
        'button', 'a', 'input', 'textarea', 'select', 
        '[role="button"]', '[data-cursor-hover]'
      ];
      
      const hover = hoverElements.some(selector => 
        document.elementFromPoint(position.x, position.y)?.closest(selector)
      );
      
      setIsHovering(hover);
    };

    const handleTouchStart = () => {
      setTouchActive(true);
      setTwinkle(true);
      setTimeout(() => setTwinkle(false), 300);
    };

    const handleTouchEnd = () => {
      setTouchActive(false);
    };

    // Efecto de centelleo aleatorio solo en desktop
    let twinkleInterval;
    if (!isTouchDevice) {
      twinkleInterval = setInterval(() => {
        setTwinkle(Math.random() > 0.7);
        setTimeout(() => setTwinkle(false), 200);
      }, 1000);
    }

    // Event listeners
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('touchmove', moveCursor, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    if (!isTouchDevice) {
      document.body.style.cursor = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('touchmove', moveCursor);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      clearInterval(twinkleInterval);
      document.body.style.cursor = '';
    };
  }, [position, isHovering, isTouchDevice]);

  const starStyle = {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: '32px',
    height: '32px',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    transition: 'transform 0.1s ease-out, filter 0.3s ease-out',
    filter: isHovering 
      ? 'drop-shadow(0 0 8px rgba(255, 255, 100, 0.9))' 
      : twinkle 
        ? 'drop-shadow(0 0 12px rgba(255, 255, 150, 1))'
        : 'drop-shadow(0 0 5px rgba(255, 255, 100, 0.7))',
    opacity: isTouchDevice ? (touchActive ? 1 : 0) : 1,
    display: isTouchDevice && !touchActive ? 'none' : 'block'
  };

  // No mostrar cursor en dispositivos táctiles cuando no está activo
  if (isTouchDevice && !touchActive) {
    return null;
  }

  return (
    <div style={starStyle}>
      <svg viewBox="0 0 32 32" fill="none">
        <path 
          d="M16 2L20 11L30 12L22 19L25 29L16 24L7 29L10 19L2 12L12 11L16 2Z" 
          fill={isHovering ? '#FFEA00' : '#FFD700'}
          stroke="#FFC000"
          strokeWidth="0.5"
        />
        <path 
          d="M16 6L18 12L24 12L19 16L21 22L16 18L11 22L13 16L8 12L14 12L16 6Z" 
          fill={isHovering ? 'rgba(255, 255, 200, 0.8)' : 'rgba(255, 255, 220, 0.6)'}
        />
        <circle 
          cx="16" 
          cy="16" 
          r="3" 
          fill={twinkle ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)'}
        />
      </svg>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isHovering ? '40px' : twinkle ? '48px' : '32px',
        height: isHovering ? '40px' : twinkle ? '48px' : '32px',
        background: `radial-gradient(circle, 
          rgba(255, 255, 150, ${isHovering ? 0.4 : twinkle ? 0.6 : 0.2}) 0%, 
          rgba(255, 255, 100, 0) 70%)`,
        borderRadius: '50%',
        transition: 'all 0.3s ease-out',
        zIndex: -1
      }} />
    </div>
  );
};

export default StarCursor;