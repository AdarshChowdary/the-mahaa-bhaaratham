// components/CustomCursor.js
'use client';
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    // Handle mouse enter/leave the document
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div 
      className="custom-cursor pointer-events-none fixed z-50 transition-opacity duration-150"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
      data-testid="custom-cursor"
      data-cursor-position={`${position.x},${position.y}`}
      data-cursor-visible={isVisible}
      data-cursor-active="true"
      role="presentation"
    />
  );
};

export default CustomCursor;