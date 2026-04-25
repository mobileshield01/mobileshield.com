import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { label: "PROTECTED USERS", value: 10, suffix: "M+", duration: 3 },
  { label: "THREAT PREVENTION", value: 99.9, suffix: "%", duration: 2.5 },
  { label: "THREATS NEUTRALIZED", value: 50, suffix: "B+", duration: 4 },
  { label: "UPTIME", value: 24, suffix: "/7", duration: 2 },
];

export default function StatSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 py-24 mb-20 border-t border-b border-white/5 bg-slate-900/20 backdrop-blur-sm">
      {stats.map((stat, i) => (
        <StatCounter key={i} {...stat} />
      ))}
    </div>
  );
}

function StatCounter({ label, value, suffix, duration }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalFrames = duration * 60;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = start + (end - start) * progress;
        
        if (frame >= totalFrames) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(currentCount);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  const displayCount = typeof value === 'number' && value % 1 === 0 
    ? Math.floor(count) 
    : count.toFixed(1);

  return (
    <div ref={ref} className="text-center group">
      <motion.div
        animate={isInView ? { 
          scale: [0.95, 1.05, 1],
          opacity: [0, 1]
        } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-black text-cyan-400 mb-2 font-mono flex justify-center items-baseline glow-text"
      >
        {displayCount}{suffix}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-[10px] md:text-xs font-black tracking-[0.3em] text-gray-500 uppercase group-hover:text-cyan-300 transition-colors"
      >
        {label}
      </motion.div>
    </div>
  );
}
