import React from 'react';
import { useUntouchableCat } from '../hooks/useUntouchableCat';
import ReusableModal from './ReusableModal';

const UntouchableCat: React.FC = () => {
  const { pos, isCaught, catRef, containerRef, handleMouseMove, handleCatch, closeModal } = useUntouchableCat();

  return (
    <>
      <div ref={containerRef} className="relative min-h-screen overflow-hidden" style={{ backgroundImage: `linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)`, backgroundSize: '100px 100px' }}>
        <img 
          ref={catRef} 
          src="/scubacat.gif" 
          alt="Scuba cat" 
          onMouseMove={handleMouseMove}
          onClick={handleCatch}
          className="absolute w-80 md:w-96 cursor-pointer transition-all duration-150" 
          style={{ top: `${pos.top}%`, left: `${pos.left}%`, transform: 'translate(-50%, -50%)' }} 
        />
      </div>
      
      <ReusableModal isOpen={isCaught} onClose={closeModal} />
    </>
  );
};

export default UntouchableCat;