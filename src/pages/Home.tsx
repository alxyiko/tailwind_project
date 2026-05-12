import React, { useState, useRef, useCallback } from 'react';

interface ButtonPosition {
  top: number;
  left: number;
}

const Home: React.FC = () => {
  const [buttonPositions, setButtonPositions] = useState<ButtonPosition[]>(() => {
    // Generate 8 random positions (percentages)
    const positions = [];
    for (let i = 0; i < 8; i++) {
      positions.push({
        top: Math.random() * 80 + 10,  // Between 10% and 90%
        left: Math.random() * 80 + 10, // Between 10% and 90%
      });
    }
    return positions;
  });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>(Array(8).fill(null));

  const jumpAway = useCallback((index: number, mouseX: number, mouseY: number) => {
    const container = document.querySelector('.relative.min-h-screen');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    // Button dimensions (approximate)
    const buttonWidth = 100;
    const buttonHeight = 44;
    
    // Calculate new position away from mouse
    let newTop = Math.random() * (containerHeight - buttonHeight);
    let newLeft = Math.random() * (containerWidth - buttonWidth);
    
    // Convert to percentage relative to container
    let newTopPercent = (newTop / containerHeight) * 100;
    let newLeftPercent = (newLeft / containerWidth) * 100;
    
    // Ensure button stays within boundaries (5% to 95%)
    newTopPercent = Math.min(95, Math.max(5, newTopPercent));
    newLeftPercent = Math.min(95, Math.max(5, newLeftPercent));
    
    setButtonPositions(prev => {
      const updated = [...prev];
      updated[index] = { top: newTopPercent, left: newLeftPercent };
      return updated;
    });
  }, []);

  const handleMouseMove = useCallback((index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRefs.current[index];
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate distance from mouse to button center
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(mouseX - buttonCenterX, 2) + 
      Math.pow(mouseY - buttonCenterY, 2)
    );
    
    // If mouse is too close (within 80px), make the button jump away
    if (distance < 80) {
      jumpAway(index, mouseX, mouseY);
    }
  }, [jumpAway]);

  const handleClick = (buttonIndex: number) => {
    console.log(`Button ${buttonIndex + 1} clicked!`);
    alert(`You actually caught Button ${buttonIndex + 1}! galing!`);
  };

  const setButtonRef = useCallback((index: number) => (el: HTMLButtonElement | null) => {
    buttonRefs.current[index] = el;
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
  
        <img
          src="/scubacat.gif"
          alt="Scuba cat animation"
          className="w-80 md:w-96 h-auto pointer-events-auto"
        />
       
      </div>

      {buttonPositions.map((position, index) => (
        <button
          key={index}
          ref={setButtonRef(index)}
          onClick={() => handleClick(index)}
          onMouseMove={(e) => handleMouseMove(index, e)}
          className="absolute px-5 py-3 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400 z-10 pointer-events-auto cursor-pointer whitespace-nowrap"
          style={{
            top: `${position.top}%`,
            left: `${position.left}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.15s ease-out, left 0.15s ease-out',
          }}
        >
          😼 {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Home;