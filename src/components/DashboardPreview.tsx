import { motion } from 'motion/react';
import { Activity, Shield, Lock, Bell, Users, Cpu } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <div className="py-24 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">CONTROL CENTER</h2>
          <p className="text-gray-400">A unified view of your device's security ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
          {/* Main Monitor */}
          <div className="lg:col-span-8 bg-[#111] rounded-[2rem] border border-white/5 p-8 flex flex-col overflow-hidden relative">
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[10px] font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                SECURE_PROTOCOL_v4.2
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Activity className="text-cyan-400" size={20} />
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded">LIVE</span>
                </div>
                <div className="text-2xl font-bold mb-1">98.4%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Network Stability</div>
                <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-cyan-500"
                    animate={{ width: ['80%', '98%', '92%', '98%'] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                 <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Shield className="text-purple-400" size={20} />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">0</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Active Threats</div>
                <div className="mt-4 flex gap-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex-1 h-3 bg-green-500/20 rounded-sm" />
                  ))}
                </div>
              </div>

              <div className="col-span-2 bg-white/5 rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                <div className="flex items-center gap-4 mb-6">
                  <Cpu className="text-cyan-400" />
                  <span className="text-sm font-bold tracking-widest">NEURAL SCAN ENGINE</span>
                </div>
                <div className="flex gap-2 h-20 items-end">
                   {[...Array(24)].map((_, i) => (
                     <motion.div 
                        key={i}
                        className="flex-1 bg-cyan-500/40 rounded-t-sm"
                        animate={{ height: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                        transition={{ duration: 1, repeat: Infinity, alternate: true }}
                     />
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Side Panels */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex-1 bg-[#111] rounded-[2rem] border border-white/5 p-6">
               <div className="flex items-center gap-3 mb-6">
                  <Bell size={18} className="text-yellow-500" />
                  <span className="text-sm font-bold uppercase tracking-tighter">Security Logs</span>
               </div>
               <div className="space-y-4">
                  {[
                    { t: '12:44', m: 'Firewall blockade success', s: 'text-green-400' },
                    { t: '12:40', m: 'Encrypted tunnel active', s: 'text-cyan-400' },
                    { t: '12:38', m: 'API permission requested', s: 'text-yellow-400' },
                    { t: '12:35', m: 'Database sync complete', s: 'text-gray-400' },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-4 text-[10px] font-mono border-b border-white/5 pb-2">
                       <span className="text-gray-600">{log.t}</span>
                       <span className={log.s}>{log.m}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-cyan-500 rounded-[2rem] p-8 flex flex-col items-center justify-center text-black text-center group cursor-pointer hover:bg-white transition-colors duration-500">
               <Lock size={40} className="mb-4" />
               <div className="text-xl font-black mb-1">LOCKDOWN</div>
               <div className="text-[10px] font-bold uppercase opacity-60">Instant Protection Mode</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
