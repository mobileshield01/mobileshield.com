import { motion, AnimatePresence } from 'motion/react';
import { Shield, Skull, CheckCircle2, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThreatSimulation() {
  const [threats, setThreats] = useState<{ id: number; x: number; y: number }[]>([]);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'detected' | 'eliminated'>('idle');

  const spawnThreat = () => {
    setStatus('scanning');
    setTimeout(() => {
      setStatus('detected');
      const newThreats = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
      }));
      setThreats(newThreats);

      // Start absorption after 1.5s
      setTimeout(() => {
        setThreats([]);
        setStatus('eliminated');
        setTimeout(() => setStatus('idle'), 2000);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="py-24 max-w-5xl mx-auto px-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center mb-16 glow-text">INTERACTIVE THREAT DETECTION</h2>
      
      <div className="relative w-full h-[500px] bg-black/40 rounded-[40px] border border-cyan-500/20 flex items-center justify-center overflow-hidden">
        {/* Radar Effect */}
        <motion.div
           className="absolute w-[600px] h-[600px] border border-cyan-500/10 rounded-full"
           animate={{ scale: [0, 1.5], opacity: [0.5, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />

        <div className="relative z-10">
          {/* Main Shield in simulation */}
          <motion.div
            variants={{
              idle: { 
                scale: 1,
                rotate: 0,
                borderColor: "rgba(6, 182, 212, 0.5)",
                backgroundColor: "rgba(6, 182, 212, 0.05)",
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.2)"
              },
              scanning: {
                scale: [1, 1.05, 1],
                transition: { duration: 0.5, repeat: Infinity }
              },
              detected: { 
                scale: [1, 1.1, 0.95, 1.05, 1],
                rotate: [0, -2, 2, -2, 0],
                borderColor: "#ef4444",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                boxShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.4)",
                  "0 0 60px rgba(239, 68, 68, 0.6)",
                  "0 0 20px rgba(239, 68, 68, 0.4)"
                ],
                transition: { 
                  scale: { duration: 0.3, repeat: Infinity },
                  rotate: { duration: 0.1, repeat: Infinity },
                  boxShadow: { duration: 0.3, repeat: Infinity }
                }
              },
              eliminated: { 
                scale: [1, 1.4, 1],
                borderColor: "#22c55e",
                backgroundColor: "rgba(34, 197, 94, 0.3)",
                boxShadow: "0 0 80px rgba(34, 197, 94, 0.8)",
                transition: { duration: 0.5 }
              }
            }}
            animate={status}
            initial="idle"
            className="p-10 rounded-full border-2 relative z-10"
          >
            {/* Visual shockwave on eliminated */}
            <AnimatePresence>
              {status === 'eliminated' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 border-4 border-green-400 rounded-full"
                />
              )}
            </AnimatePresence>

            {/* Inner rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border border-dashed border-white/20 rounded-full pointer-events-none"
            />
            
            <Shield 
              size={72} 
              className={`transition-colors duration-300 ${
                status === 'detected' ? 'text-red-500' : 
                status === 'eliminated' ? 'text-green-400' : 
                'text-cyan-400'
              }`} 
            />
          </motion.div>

          {/* Threats orbiting/flying in */}
          <AnimatePresence>
            {threats.map((threat) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, x: threat.x, y: threat.y }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1, ease: "backIn" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="p-3 bg-red-500 rounded-xl shadow-lg shadow-red-500/50">
                   <Skull size={24} className="text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* HUD Info */}
        <div className="absolute top-8 left-8 flex flex-col gap-2">
           <StatusBadge status={status} />
        </div>

        <div className="absolute bottom-8 flex flex-col items-center gap-4">
           {status === 'idle' && (
             <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={spawnThreat}
              className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center gap-2"
             >
               <Zap size={20} /> INITIATE LIVE SCAN
             </motion.button>
           )}
           
           {status === 'eliminated' && (
             <motion.div
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 1, scale: 1 }}
               className="flex items-center gap-2 text-green-400 font-bold text-xl"
             >
               <CheckCircle2 /> THREAT ELIMINATED
             </motion.div>
           )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, any> = {
    idle: { label: 'SYSTEM READY', color: 'text-cyan-400', dot: 'bg-cyan-400' },
    scanning: { label: 'ANALYZING...', color: 'text-yellow-400', dot: 'bg-yellow-400' },
    detected: { label: 'THREAT DETECTED!', color: 'text-red-500 underline decoration-2', dot: 'bg-red-500 animate-pulse' },
    eliminated: { label: 'CLEAN', color: 'text-green-400', dot: 'bg-green-400' },
  };

  const curr = config[status] || config.idle;

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/10 rounded-lg">
      <div className={`w-2 h-2 rounded-full ${curr.dot}`} />
      <span className={`text-xs font-mono font-bold tracking-widest ${curr.color}`}>
        {curr.label}
      </span>
    </div>
  );
}
