import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export default function RotatingShield() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Lightning Bolts (Simulated with rotating lines) */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full border border-cyan-400/10 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2 + i,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-cyan-400 blur-[2px]" />
        </motion.div>
      ))}

      {/* Outer Rotating Scan Ring */}
      <motion.div
        className="absolute inset-[-40px] border border-cyan-500/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 bg-cyan-500 text-[8px] font-black tracking-[0.3em] uppercase rounded-full">
          SCANNING_ACTIVE
        </div>
      </motion.div>

      {/* Main Shield Icon */}
      <motion.div
        className="relative z-10 p-12 bg-gray-900/40 backdrop-blur-md rounded-full border border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.3)]"
        animate={{
          rotateY: 360,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Shield size={120} className="text-cyan-400 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        
        {/* Shine Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-full"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1
          }}
        />
      </motion.div>

      {/* Decorative Accents from Screenshot */}
      <div className="absolute bottom-4 w-40 h-16 z-20 pointer-events-none" style={{ perspective: '1000px' }}>
        <div 
          className="w-full h-full border-2 border-cyan-500/50 bg-cyan-500/10"
          style={{ 
            transform: 'rotateX(75deg) rotateZ(-10deg)',
            clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)'
          }}
        >
          {/* Inner line on the floor */}
          <div className="absolute bottom-4 left-6 w-1 h-8 bg-cyan-400 rotate-[30deg] blur-[0.5px]" />
        </div>
      </div>

      {/* Electric Spark Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute w-1 h-1 bg-cyan-300 rounded-full blur-[1px]"
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: [0, (Math.random() - 0.5) * 300],
            y: [0, (Math.random() - 0.5) * 300],
          }}
          transition={{
            duration: 0.3 + Math.random() * 0.5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeOut"
          }}
        />
      ))}
      <div className="absolute w-[120%] h-[120%] border border-cyan-500/5 rounded-full animate-pulse" />
    </div>
  );
}
