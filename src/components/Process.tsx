"use client";

import { motion } from "framer-motion";
import { Search, Code, Rocket, BarChart3, Layers, CheckCircle, Settings, Zap, Globe, MapPin } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Keşif & Analiz",
    desc: "İşletmenizin mevcut süreçlerini analiz ediyor, otomasyon fırsatlarını ve dijital ihtiyaçları belirliyoruz.",
    details: ["Süreç Haritalama", "İhtiyaç Analizi", "Rakip Araştırma"],
    textSide: "left" as const,
    icons: [MapPin, Search, BarChart3],
  },
  {
    num: "02",
    title: "Tasarım & Geliştirme",
    desc: "İhtiyaçlarınıza özel çözümler tasarlıyor, modern teknolojilerle kusursuz bir şekilde geliştiriyoruz.",
    details: ["UI/UX Tasarım", "Yazılım Geliştirme", "AI Entegrasyon"],
    textSide: "right" as const,
    icons: [Code, Settings, Zap],
  },
  {
    num: "03",
    title: "Lansman & Büyüme",
    desc: "Projenizi canlıya alıyor, performansını izliyor ve sürekli iyileştirmelerle büyümenize destek oluyoruz.",
    details: ["Canlıya Alma", "Performans Takibi", "Sürekli Destek"],
    textSide: "left" as const,
    icons: [Rocket, Globe, CheckCircle],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* Floating icon positions inside the square card */
const iconPositions = [
  { top: "18%", left: "22%" },
  { top: "20%", right: "22%" },
  { top: "58%", left: "35%" },
];

export default function Process() {
  return (
    <section id="surec" className="bg-[var(--color-surface)]">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="section-badge mb-4 inline-flex">Nasıl Çalışırız?</span>
          <h2 className="heading-lg mt-4">
            Başarıya Giden <span className="gradient-text">3 Adım</span>
          </h2>
          <p className="text-[var(--color-muted)] mt-4 max-w-xl mx-auto text-base md:text-lg">
            Şeffaf ve sonuç odaklı sürecimizle projenizi en kısa sürede hayata geçiriyoruz.
          </p>
        </motion.div>

        {/* Steps - Zigzag */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-24 md:gap-32 max-w-6xl mx-auto"
        >
          {steps.map((step, stepIndex) => {
            const isTextLeft = step.textSide === "left";
            const MainIcon = step.icons[0];

            return (
              <motion.div
                key={step.num}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
                  isTextLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Text Side */}
                <div className="flex-1 min-w-0">
                  <motion.div
                    initial={{ opacity: 0, x: isTextLeft ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="text-8xl md:text-9xl font-black text-[var(--color-primary)] opacity-10 block mb-2 leading-none">
                      {step.num}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-6">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-muted)] text-lg leading-relaxed mb-8 max-w-lg">
                      {step.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {step.details.map((detail) => (
                        <span
                          key={detail}
                          className="px-4 py-2 text-sm font-medium rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-muted)] shadow-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Animated Card Side */}
                <div className="relative group">
                   {/* Background Decorative Element */}
                   <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-primary)]/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   
                   <motion.div
                    whileHover={{ y: -10 }}
                    className="w-[320px] h-[320px] md:w-[420px] md:h-[400px] bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-[var(--color-border)]/50 relative overflow-hidden flex items-center justify-center p-12"
                   >
                     {/* Step Specific Illustrations */}
                     {step.num === "01" && (
                       <div className="relative w-full h-full flex items-center justify-center">
                         {/* Location Ping Rings */}
                         <div className="absolute w-32 h-32 border-2 border-[var(--color-primary)]/20 rounded-full animate-ping" />
                         <div className="absolute w-48 h-48 border border-[var(--color-primary)]/10 rounded-full animate-[ping_3s_infinite]" />
                         
                         {/* Main Location Pin */}
                         <motion.div 
                           animate={{ y: [0, -20, 0] }}
                           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                           className="relative z-10 text-[var(--color-primary)]"
                         >
                           <MapPin size={80} strokeWidth={1.5} />
                           <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/10 rounded-full blur-sm animate-pulse" />
                         </motion.div>

                         {/* Floating Data Points */}
                         {[0, 1, 2].map((i) => (
                           <motion.div
                             key={i}
                             animate={{ 
                               y: [0, -40, 0], 
                               x: [0, i % 2 === 0 ? 20 : -20, 0],
                               opacity: [0.3, 1, 0.3] 
                             }}
                             transition={{ duration: 3 + i, repeat: Infinity, delay: i }}
                             className="absolute bg-white p-3 rounded-xl shadow-lg border border-[var(--color-border)]"
                             style={{
                               top: `${20 + i * 25}%`,
                               left: `${15 + i * 35}%`,
                             }}
                           >
                             {i === 0 ? <Search size={18} /> : i === 1 ? <BarChart3 size={18} /> : <Layers size={18} />}
                           </motion.div>
                         ))}
                       </div>
                     )}

                     {step.num === "02" && (
                       <div className="relative w-full h-full flex items-center justify-center">
                         {/* Rotating Gear/Circles Background */}
                         <div className="absolute w-64 h-64 border-2 border-dashed border-[var(--color-border)] rounded-full animate-spin-slow opacity-20" />
                         
                         {/* Coding Card */}
                         <motion.div
                           animate={{ rotate: [-1, 1, -1], scale: [1, 1.02, 1] }}
                           transition={{ duration: 5, repeat: Infinity }}
                           className="relative z-10 bg-[var(--color-dark)] p-6 rounded-2xl shadow-2xl w-64 border border-white/10"
                         >
                            <div className="flex gap-1.5 mb-4">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <div className="space-y-2">
                              <div className="h-2 bg-[var(--color-primary)]/40 rounded w-3/4 animate-pulse" />
                              <div className="h-2 bg-white/10 rounded w-1/2" />
                              <div className="h-2 bg-white/10 rounded w-2/3" />
                              <div className="flex gap-2">
                                <div className="h-2 bg-[var(--color-primary)]/60 rounded w-1/4" />
                                <div className="h-2 bg-white/5 rounded w-1/3" />
                              </div>
                            </div>
                         </motion.div>

                         {/* Floating Settings/Zap Icons */}
                         <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute top-10 right-10 text-[var(--color-primary)] opacity-40"
                          >
                           <Settings size={32} />
                         </motion.div>
                         <motion.div 
                            animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4] }} 
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute bottom-10 left-10 text-yellow-500"
                          >
                           <Zap size={28} fill="currentColor" />
                         </motion.div>
                       </div>
                     )}

                     {step.num === "03" && (
                       <div className="relative w-full h-full flex items-center justify-center">
                         {/* Orbit Lines */}
                         <div className="absolute w-72 h-40 border border-[var(--color-border)] rounded-[100%] rotate-45 opacity-20" />
                         <div className="absolute w-72 h-40 border border-[var(--color-border)] rounded-[100%] -rotate-45 opacity-20" />

                         {/* Rocket Launcher */}
                         <motion.div
                           animate={{ 
                             y: [0, -10, 0],
                             rotate: [0, 2, 0]
                           }}
                           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                           className="relative z-10 text-[var(--color-primary)]"
                         >
                           <Rocket size={84} strokeWidth={1.5} />
                           {/* Exhaust Flame Effect */}
                           <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-t from-orange-500/0 via-orange-500/40 to-orange-500/80 blur-md rounded-full animate-pulse-soft" />
                         </motion.div>

                         {/* Launching Particles */}
                         {[0, 1, 2, 3].map((i) => (
                           <motion.div
                             key={i}
                             initial={{ y: 100, opacity: 0 }}
                             animate={{ y: -200, opacity: [0, 1, 0] }}
                             transition={{ 
                               duration: 2, 
                               repeat: Infinity, 
                               delay: i * 0.5,
                               ease: "easeOut" 
                             }}
                             className="absolute w-1 h-1 bg-[var(--color-primary)] rounded-full"
                             style={{ left: `${40 + i * 5}%` }}
                           />
                         ))}

                         {/* World Background */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
                       </div>
                     )}

                     {/* Grid Overlay */}
                     <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                   </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
