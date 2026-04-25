import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import RotatingShield from './components/RotatingShield';
import ParticleBackground from './components/ParticleBackground';
import FeatureCards from './components/FeatureCards';
import ThreatSimulation from './components/ThreatSimulation';
import StatSection from './components/StatSection';
import PricingSection from './components/PricingSection';
import DashboardPreview from './components/DashboardPreview';
import { Smartphone, Shield, ShieldCheck, Twitter, Github, Linkedin, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const yShield = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const yHeroText = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <div className="relative min-h-screen">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[100] origin-[0%]"
        style={{ scaleX }}
      />
      
      <ParticleBackground />

      {/* Floating Scroll to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-4 bg-cyan-500 text-black rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-white transition-colors"
      >
        <ArrowUp size={24} />
      </motion.button>

      {/* Side Progress Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 hidden lg:flex">
        {['hero', 'features', 'security', 'stats', 'pricing'].map((section, i) => (
          <motion.a
            key={section}
            href={`#${section}`}
            className="w-1 bg-white/10 h-10 rounded-full relative overflow-hidden"
            whileHover={{ scaleX: 2 }}
          >
            <motion.div 
              className="absolute inset-0 bg-cyan-500"
              style={{ scaleY: scrollYProgress, originY: 0 }}
            />
          </motion.a>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-transparent backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-cyan-500 rounded-lg">
            <ShieldCheck size={20} className="text-black" />
          </div>
          <span className="font-bold tracking-tight text-xl">MOBILE SHIELD</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-cyan-400 transition-colors">FEATURES</a>
          <a href="#security" className="hover:text-cyan-400 transition-colors">SECURITY</a>
          <a href="#pricing" className="hover:text-cyan-400 transition-colors">PRICING</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">SUPPORT</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ y: yShield }}
          className="mb-12"
        >
          <RotatingShield />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: yHeroText }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 glow-text"
        >
          MOBILE SHIELD
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
        >
          The world's most advanced 3D cybersecurity suite. 
          Real-time threat elimination powered by neural protection.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href="https://d6f7aceb119046b6bb.v2.appdeploy.ai/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 40px rgba(6, 182, 212, 0.7)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-cyan-500 text-black font-black rounded-full tracking-widest relative overflow-hidden group shadow-[0_0_20px_rgba(6,182,212,0.4)] block"
          >
            <span className="relative z-10">TRY MOBILE SHIELD FREE</span>
            <motion.div 
               className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
            />
          </motion.a>
        </motion.div>

        {/* Scroll Reveal Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-cyan-500 rounded-full" 
            />
          </div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Scroll to explore</span>
        </motion.div>
      </section>

      {/* Feature Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="features" 
        className="bg-black/20"
      >
        <FeatureCards />
      </motion.section>

      <DashboardPreview />

      {/* Live Simulation */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        id="security" 
        className="relative"
      >
        <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full" />
        <ThreatSimulation />
      </motion.section>

      {/* Stats */}
      <motion.section
        id="stats"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <StatSection />
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <PricingSection />
      </motion.section>

      {/* Final CTA */}
      <section className="py-32 px-6 text-center bg-gradient-to-t from-cyan-900/20 to-transparent">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 glow-text">ULTIMATE DEVICE PROTECTION</h2>
          <p className="text-gray-400 mb-12 text-lg">Join 10 million+ users who trust Mobile Shield for their daily security needs.</p>
          <div className="flex justify-center gap-4">
             <div className="flex flex-col items-center gap-2">
               <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 cursor-pointer hover:border-cyan-500 transition-colors">
                  <Smartphone size={32} className="text-cyan-400" />
               </div>
               <span className="text-[10px] font-bold text-gray-500 uppercase">iOS App</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 cursor-pointer hover:border-cyan-500 transition-colors">
                  <Shield size={32} className="text-cyan-400" />
               </div>
               <span className="text-[10px] font-bold text-gray-500 uppercase">Android</span>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-cyan-500 rounded">
                <ShieldCheck size={16} className="text-black" />
              </div>
              <span className="font-bold tracking-tight text-lg">MOBILE SHIELD</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
              Advanced security solutions for the modern mobile era. Protected since 2024.
            </p>
          </div>

          <div className="flex gap-8">
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
              <Github size={20} />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
              <Linkedin size={20} />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold text-gray-500 tracking-widest uppercase">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

