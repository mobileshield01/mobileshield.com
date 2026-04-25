import { motion } from 'motion/react';
import { 
  Scan, 
  ShieldCheck, 
  Shield,
  Eye, 
  Activity, 
  Lock, 
  Gem,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const cards = [
  {
    title: "QUICK SCAN",
    icon: Scan,
    description: "Rapidly inspect core system files for immediate threats.",
    color: "cyan",
    demo: "scan"
  },
  {
    title: "FULL SCAN",
    icon: ShieldCheck,
    description: "Comprehensive deep-dive analysis of all device contents.",
    color: "blue",
    demo: "progress"
  },
  {
    title: "PRIVACY SCANNER",
    icon: Eye,
    description: "Real-time blocking of unauthorized data harvesting.",
    color: "purple",
    demo: "privacy"
  },
  {
    title: "APP MONITOR",
    icon: Activity,
    description: "Advanced visualization of real-time data flows and usage.",
    color: "emerald",
    demo: "chart"
  },
  {
    title: "THIEF LOCK",
    icon: Lock,
    description: "Remotely disable device and secure personal data.",
    color: "red",
    demo: "lock"
  },
  {
    title: "FREE FOREVER",
    icon: Gem,
    description: "Total access to every advanced feature. $0.00 Cost.",
    color: "amber",
    demo: "typing"
  }
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 py-20">
      {cards.map((card, idx) => (
        <FeatureCard key={idx} {...card} index={idx} />
      ))}
    </div>
  );
}

function FeatureCard({ title, icon: Icon, description, color, index, demo }: any) {
  const [progress, setProgress] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (demo === 'progress' || demo === 'scan') {
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [demo]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const xVisible = e.clientX - rect.left;
    const yVisible = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (yVisible - centerY) / 20;
    const rotateY = (centerX - xVisible) / 20;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotation.x, rotateY: rotation.y }}
      className="group relative p-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/5 hover:border-cyan-500/50 transition-colors overflow-hidden"
      style={{ perspective: 1000 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
      
      {/* 3D Demo Area */}
      <div className="h-40 mb-6 flex items-center justify-center relative bg-black/40 rounded-2xl border border-white/5 overflow-hidden shadow-inner">
        {demo === 'scan' && (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Pulsating background rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-24 h-24 border border-cyan-500/20 rounded-full"
                animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
              />
            ))}

            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  filter: ['drop-shadow(0 0 5px rgba(6, 182, 212, 0.4))', 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.8))', 'drop-shadow(0 0 5px rgba(6, 182, 212, 0.4))']
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <Icon size={56} className="text-cyan-400" />
                </motion.div>
              </motion.div>

              {/* Animated Scan Line with Trail */}
              <motion.div 
                className="absolute -left-12 -right-12 h-[2px] bg-cyan-400 z-10"
                animate={{ top: ['-20%', '120%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-x-0 h-12 bg-gradient-to-t from-cyan-400/20 to-transparent top-0 -translate-y-full" />
                <div className="absolute inset-x-0 h-[20px] bg-cyan-400/40 blur-md" />
              </motion.div>
            </div>

            <div className="mt-8 flex gap-2 justify-center">
               {[1, 2, 3].map(i => (
                 <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0 }} 
                    animate={{ 
                      opacity: progress > i * 30 ? 1 : 0.2,
                      scale: progress > i * 30 ? 1 : 0.8
                    }}
                    className={progress > i * 30 ? "text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] rounded-full" : "text-gray-700"}
                 >
                   <CheckCircle2 size={16} />
                 </motion.div>
               ))}
            </div>
          </div>
        )}

        {demo === 'progress' && (
          <div className="w-full px-10 text-center flex flex-col items-center justify-center h-full">
             <div className="relative mb-4">
                {/* Orbital Ring */}
                <motion.div
                  className="absolute inset-1 border-2 border-dashed border-blue-500/30 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  animate={{ 
                    rotateY: 360,
                    y: [0, -5, 0]
                  }}
                  transition={{ 
                    rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="relative z-10"
                >
                    <Icon size={56} className="text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                </motion.div>
             </div>

             <div className="w-full relative">
                <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-white/10 relative">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 relative"
                      style={{ width: `${progress}%` }}
                    >
                      {/* Moving "light beam" within the progress bar */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                </div>
                {/* Progress markers */}
                <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-1">
                   <div className="w-[1px] h-1 bg-white/20" />
                   <div className="w-[1px] h-1 bg-white/20" />
                   <div className="w-[1px] h-1 bg-white/20" />
                   <div className="w-[1px] h-1 bg-white/20" />
                   <div className="w-[1px] h-1 bg-white/20" />
                </div>
             </div>
             <div className="mt-4 flex flex-col gap-1">
                <p className="text-[11px] font-black font-mono text-blue-400 tracking-[0.25em] flex items-center gap-2">
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-blue-500"
                  />
                  {progress}% SECTOR ANALYSIS
                </p>
                <div className="text-[8px] font-mono text-gray-500 flex justify-between uppercase">
                  <span>Vol 01: Secure</span>
                  <span>{progress < 50 ? "Scanning..." : "Analyzing..."}</span>
                </div>
             </div>
          </div>
        )}

        {demo === 'privacy' && (
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Privacy Demo: Scanning eyes/data being blocked by a shield */}
             <div className="relative">
               <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
               >
                 <Shield size={64} className="text-purple-400 fill-purple-400/10" />
               </motion.div>
               
               {/* Malicious entities being deflected */}
               {[...Array(4)].map((_, i) => (
                 <motion.div
                  key={i}
                  className="absolute"
                  animate={{ 
                    x: [Math.cos(i) * 100, Math.cos(i) * 30, Math.cos(i) * 120], 
                    y: [Math.sin(i) * 100, Math.sin(i) * 30, Math.sin(i) * 120],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                 >
                    <Eye size={16} className="text-red-400" />
                 </motion.div>
               ))}
             </div>
          </div>
        )}

        {demo === 'chart' && (
          <div className="w-full h-full p-4 relative flex flex-col justify-end">
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <span className="text-[10px] font-mono text-emerald-400/50">OUTGOING DATA</span>
              <span className="text-[10px] font-mono text-emerald-400/50">4.2 GB/s</span>
            </div>
            {/* Visualizing Data Flow with growing bars and floating particles */}
            <div className="flex items-end gap-2 h-20 px-8 relative z-10">
              {[40, 70, 45, 90, 60, 80, 55].map((h, i) => (
                <div key={i} className="flex-1 relative group">
                  <motion.div
                    className="w-full bg-emerald-500/40 border-t-2 border-emerald-400 rounded-t-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1, ease: "easeInOut" }}
                  />
                  {/* Floating data particles above bars */}
                  <motion.div
                    className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full"
                    animate={{ y: [0, -40], opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {demo === 'lock' && (
          <motion.div
            animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <Lock size={56} className="text-red-400 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]" />
              <motion.div 
                className="absolute inset-0 bg-red-400/20 blur-xl rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="mt-4 flex gap-1.5 p-1.5 bg-black/20 rounded-lg">
              {[0, 1, 2, 3].map(i => (
                <motion.div 
                  key={i} 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-2 h-2 rounded-full bg-red-500" 
                />
              ))}
            </div>
          </motion.div>
        )}

        {demo === 'typing' && (
          <div className="text-center relative">
            <motion.div 
              animate={{ rotateY: 360, rotateZ: [0, 5, -5, 0] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative z-10"
            >
              <Gem size={56} className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]" />
            </motion.div>
            
            <motion.div 
              className="absolute -inset-4 bg-amber-400/10 blur-2xl rounded-full mix-blend-overlay"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="mt-4 text-[10px] font-black text-amber-300 tracking-[0.3em] uppercase">
              100% FREE ACCESS
            </div>
          </div>
        )}
      </div>

      <h3 className="text-xl font-black mb-3 tracking-tight glow-text flex justify-between items-center">
        {title}
        {demo === 'typing' && <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded-md border border-amber-500/30">LIFETIME</span>}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 h-10 line-clamp-2">{description}</p>
      
      <motion.button
        whileHover={{ x: 10 }}
        className="text-xs font-black tracking-[0.2em] text-cyan-400 flex items-center gap-2 group-hover:text-cyan-300 transition-all"
      >
        VIEW MODULE <span className="text-lg leading-none">→</span>
      </motion.button>
    </motion.div>
  );
}
