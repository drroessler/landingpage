import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface NetworkBackgroundProps {
  nodeCount?: number;
  connectionDistance?: number;
  nodeColor?: string;
  lineColor?: string;
  speed?: number;
  className?: string;
}

export default function NetworkBackground({
  nodeCount = 60,
  connectionDistance = 150,
  nodeColor = "15, 23, 42",      // ink rgb
  lineColor = "15, 23, 42",      // ink rgb
  speed = 0.3,
  className = "",
}: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
    }

    function initNodes() {
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const s = (0.2 + Math.random() * 0.8) * speed;
        nodesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * s,
          vy: Math.sin(angle) * s,
          radius: 1.5 + Math.random() * 2,
          opacity: 0.15 + Math.random() * 0.35,
        });
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Soft wrap around edges
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor}, ${node.opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    draw();

    const onResize = () => {
      resize();
      // Re-distribute nodes that are now out of bounds
      for (const node of nodesRef.current) {
        if (node.x > width) node.x = Math.random() * width;
        if (node.y > height) node.y = Math.random() * height;
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [nodeCount, connectionDistance, nodeColor, lineColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
