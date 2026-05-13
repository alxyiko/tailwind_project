import React, { useState, useRef, useCallback } from 'react';

const Home: React.FC = () => {
  const [pos, setPos] = useState({ top: 50, left: 50 });
  const catRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const jumpAway = useCallback(() => {
    if (!containerRef.current || !catRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const catW = catRef.current.offsetWidth;
    const catH = catRef.current.offsetHeight;
    const newTop = Math.min(95, Math.max(5, (Math.random() * (height - catH) / height) * 100));
    const newLeft = Math.min(95, Math.max(5, (Math.random() * (width - catW) / width) * 100));
    setPos({ top: newTop, left: newLeft });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    if (!catRef.current) return;
    const rect = catRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    if (Math.sqrt(dx * dx + dy * dy) < 100) jumpAway();
  }, [jumpAway]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden" style={{ backgroundImage: `linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)`, backgroundSize: '100px 100px' }}>
      <img ref={catRef} src="/scubacat.gif" alt="Scuba cat" onMouseMove={handleMouseMove} className="absolute w-80 md:w-96 cursor-pointer transition-all duration-150" style={{ top: `${pos.top}%`, left: `${pos.left}%`, transform: 'translate(-50%, -50%)' }} />
      
    </div>
  );
};

export default Home;