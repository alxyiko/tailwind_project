import { useState, useRef, useCallback } from 'react';

export const useUntouchableCat = () => {
  const [pos, setPos] = useState({ top: 50, left: 50 });
  const [isCaught, setIsCaught] = useState(false);
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

  const handleCatch = useCallback(() => {
    setIsCaught(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsCaught(false);
  }, []);

  return {
    pos,
    isCaught,
    catRef,
    containerRef,
    handleMouseMove,
    handleCatch,
    closeModal
  };
};