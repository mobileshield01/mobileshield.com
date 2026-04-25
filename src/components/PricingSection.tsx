import { motion } from 'motion/react';
import { CheckCircle2, Gift } from 'lucide-react';

export default function PricingSection() {
  const freeFeatures = [
    "Full Device Scanning",
    "Real-time Threat Protection",
    "App Behavior Monitoring",
    "Privacy Leak Detection",
    "Cloud-based Neural Engine",
    "24/7 Security Support"
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-cyan-950/20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-8"
        >
          <Gift size={14} /> NO COST SECURITY
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-6 glow-text tracking-tight">TOTAL PROTECTION, ZERO COST</h2>
        <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
          We believe everyone deserves safety. Every feature listed above is included in our basic plan for free, forever.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          {freeFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5"
            >
              <CheckCircle2 className="text-green-400" size={20} />
              <span className="font-medium text-gray-200">{feature}</span>
              <span className="ml-auto text-[10px] font-black text-cyan-500">FREE</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl inline-block"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-2">Current Plan</div>
          <div className="text-5xl font-black glow-text">$0<span className="text-xl text-gray-500 font-normal">/lifetime</span></div>
        </motion.div>
      </div>
    </section>
  );
}
