import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

export default function ParticleBackground() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 1000], [0, -100]);

  useEffect(() => {
    const p = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(p);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-10 bg-[#0f172a]">
      {/* Animated Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-[200px]"
          animate={{
            y: [-200, 1000],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute inset-0"
          animate={{
            y: [0, 40],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100% 40px',
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-500/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Ambient Gradient */}
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-cyan-900/10 via-transparent to-transparent opacity-50" />
    </div>
  );
}
