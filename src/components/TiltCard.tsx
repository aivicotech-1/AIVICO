import { useState, useRef, useEffect, type ReactNode, type MouseEvent } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glow?: boolean;
  onClick?: () => void;
  tabIndex?: number;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  perspective = 1000,
  glow = true,
  onClick,
  tabIndex,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const [style, setStyle] = useState<{
    transform: string;
    glowX: number;
    glowY: number;
    isHovered: boolean;
  }>({
    transform: '',
    glowX: 50,
    glowY: 50,
    isHovered: false,
  });

  // Freeze tilt transformations during active page scroll to prevent cursor jump/jitter
  useEffect(() => {
    const handleScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // If the user is scrolling, do not trigger tilt changes
    if (isScrollingRef.current || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check bounds
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      handleMouseLeave();
      return;
    }

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = Math.max(-maxTilt, Math.min(maxTilt, ((y - centerY) / centerY) * -maxTilt));
    const rotateY = Math.max(-maxTilt, Math.min(maxTilt, ((x - centerX) / centerX) * maxTilt));

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`,
      glowX,
      glowY,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setStyle((prev) => ({
      ...prev,
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0px)`,
      isHovered: false,
    }));
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      tabIndex={tabIndex}
      style={{
        transform: style.transform,
        transition: style.isHovered
          ? 'transform 0.15s ease-out'
          : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {glow && (
        <div
          className="tilt-card-glow"
          style={{
            opacity: style.isHovered ? 1 : 0,
            background: `radial-gradient(circle 240px at ${style.glowX}% ${style.glowY}%, var(--border-glow), transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="tilt-card-inner">{children}</div>
    </div>
  );
}
