import { useEffect, useRef } from 'react';

interface Hero3DCanvasProps {
  theme?: 'dark' | 'light';
}

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  pulsePhase: number;
  highlight?: boolean;
}

interface Packet {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

export function Hero3DCanvas({ theme = 'dark' }: Hero3DCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const isDark = theme === 'dark';

    // Graphite and jade technology palette with high contrast in both themes.
    const mainNodeColor = isDark ? '#34d399' : '#047857';
    const highlightNodeColor = isDark ? '#a7f3d0' : '#10b981';
    const lineColor = isDark ? 'rgba(52, 211, 153, ' : 'rgba(4, 120, 87, ';
    const packetColor = isDark ? '#ffffff' : '#12251f';
    const orbitRingColor = isDark ? 'rgba(52, 211, 153, 0.12)' : 'rgba(4, 120, 87, 0.18)';

    // 38 3D spatial points
    const nodeCount = 38;
    const nodes: Node3D[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const isCore = i < 6;
      const radiusDist = isCore ? 120 + Math.random() * 40 : 220 + Math.random() * 140;
      const angle = (i / nodeCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const elevation = (Math.random() - 0.5) * 200;

      nodes.push({
        x: Math.cos(angle) * radiusDist,
        y: elevation,
        z: Math.sin(angle) * radiusDist,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        vz: (Math.random() - 0.5) * 0.22,
        radius: isCore ? 5 : 2.5 + Math.random() * 1.5,
        pulsePhase: Math.random() * Math.PI * 2,
        highlight: isCore,
      });
    }

    const packets: Packet[] = [];
    for (let p = 0; p < 12; p++) {
      packets.push({
        fromIndex: Math.floor(Math.random() * 6),
        toIndex: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: 0.007 + Math.random() * 0.008,
      });
    }

    const rotX = 0.22;
    let rotY = 0;
    let frame = 0;

    const render = () => {
      frame++;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Dedicated backdrop fill to ensure perfect contrast in both light and dark modes
      if (isDark) {
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height) / 1.5);
        bgGrad.addColorStop(0, '#19302a');
        bgGrad.addColorStop(1, '#0d1715');
        ctx.fillStyle = bgGrad;
      } else {
        // Cool white gradient for light mode
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 60, width / 2, height / 2, Math.max(width, height) / 1.4);
        bgGrad.addColorStop(0, '#f3f8f5');
        bgGrad.addColorStop(1, '#d9eae2');
        ctx.fillStyle = bgGrad;
      }
      ctx.fillRect(0, 0, width, height);

      rotY += 0.0022;
      const currentRotX = rotX + mouseRef.current.y * 0.35;
      const currentRotY = rotY + mouseRef.current.x * 0.45;

      const fov = 460;
      const cx = width / 2;
      const cy = height / 2;

      interface ProjectedNode {
        node: Node3D;
        px: number;
        py: number;
        pz: number;
        scale: number;
        visible: boolean;
        index: number;
      }

      const projected: ProjectedNode[] = nodes.map((node, index) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        if (Math.hypot(node.x, node.z) > 380) {
          node.vx *= -1;
          node.vz *= -1;
        }
        if (Math.abs(node.y) > 140) node.vy *= -1;

        const cosY = Math.cos(currentRotY);
        const sinY = Math.sin(currentRotY);
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        const cosX = Math.cos(currentRotX);
        const sinX = Math.sin(currentRotX);
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const pz = z2 + 500;
        if (pz <= 20) {
          return { node, px: 0, py: 0, pz, scale: 0, visible: false, index };
        }

        const scale = fov / pz;
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        return { node, px, py, pz, scale, visible: true, index };
      });

      projected.sort((a, b) => b.pz - a.pz);

      // Rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, Math.cos(currentRotX));

      ctx.beginPath();
      ctx.arc(0, 0, 150, 0, Math.PI * 2);
      ctx.strokeStyle = orbitRingColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 260, 0, Math.PI * 2);
      ctx.setLineDash([6, 14]);
      ctx.strokeStyle = orbitRingColor;
      ctx.stroke();
      ctx.restore();

      // Lines
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (!p1.visible) continue;

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (!p2.visible) continue;

          const dx = p1.node.x - p2.node.x;
          const dy = p1.node.y - p2.node.y;
          const dz = p1.node.z - p2.node.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < 135) {
            const alpha = (1 - dist3D / 135) * (isDark ? 0.38 : 0.45) * Math.min(p1.scale, 1);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `${lineColor}${alpha})`;
            ctx.lineWidth = Math.max(0.6, (1 - dist3D / 135) * (isDark ? 1.5 : 1.7) * p1.scale);
            ctx.stroke();
          }
        }
      }

      // Packets
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
          pkt.fromIndex = Math.floor(Math.random() * 6);
          pkt.toIndex = Math.floor(Math.random() * nodeCount);
        }

        const pA = projected.find((p) => p.index === pkt.fromIndex);
        const pB = projected.find((p) => p.index === pkt.toIndex);

        if (pA && pB && pA.visible && pB.visible) {
          const curX = pA.px + (pB.px - pA.px) * pkt.progress;
          const curY = pA.py + (pB.py - pA.py) * pkt.progress;
          const pktScale = pA.scale + (pB.scale - pA.scale) * pkt.progress;

          ctx.beginPath();
          ctx.arc(curX, curY, Math.max(1.8, 2.8 * pktScale), 0, Math.PI * 2);
          ctx.fillStyle = packetColor;
          if (isDark) {
            ctx.shadowColor = '#34d399';
            ctx.shadowBlur = 6;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Nodes
      projected.forEach((p) => {
        if (!p.visible) return;

        const pulse = 1 + Math.sin(frame * 0.04 + p.node.pulsePhase) * 0.15;
        const currentRadius = p.node.radius * p.scale * pulse;

        // Halo
        ctx.beginPath();
        ctx.arc(p.px, p.py, currentRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(216, 188, 138, ${0.14 * p.scale})`
          : `rgba(87, 63, 29, ${0.12 * p.scale})`;
        ctx.fill();

        // Node Body
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1.6, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.node.highlight ? highlightNodeColor : mainNodeColor;
        if (isDark) {
          ctx.shadowColor = highlightNodeColor;
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Core highlight
        if (p.node.highlight) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, Math.max(1, currentRadius * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = isDark ? '#ffffff' : '#f7f1e6';
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  // Guard against scroll-induced pointer jumps
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isScrollingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      return;
    }
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseRef.current.targetX = Math.max(-1, Math.min(1, x));
    mouseRef.current.targetY = Math.max(-1, Math.min(1, y));
  };

  const handlePointerLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  };

  return (
    <div
      ref={containerRef}
      className="hero-3d-container"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Interactive 3D Technology Mesh"
    >
      <canvas ref={canvasRef} className="hero-3d-canvas" />

      <div className="canvas-minimal-hint">
        <span className="dot-indicator" />
        <span>Interactive Spatial Engine • Move Cursor</span>
      </div>
    </div>
  );
}
