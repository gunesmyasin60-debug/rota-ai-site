"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[rgba(99,102,241,0.08)] blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[rgba(129,140,248,0.06)] blur-[80px]" />
      </div>

      <div className="container-main relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <span className="section-badge">
            <Sparkles size={14} />
            Yapay Zekâ Destekli Otomasyon
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="heading-xl max-w-4xl mx-auto mb-6"
        >
          İşletmenizi{" "}
          <span className="gradient-text">Geleceğe</span>{" "}
          Taşıyoruz
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Web geliştirme, yapay zekâ otomasyonu ve dijital çözümlerle
          operasyonel verimliliğinizi artırıyor, maliyetlerinizi düşürüyoruz.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#iletisim" className="btn-primary">
            Ücretsiz Analiz Al
            <ArrowRight size={18} />
          </a>
          <a href="#surec" className="btn-outline">
            Nasıl Çalışırız?
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-10 border-t border-[var(--color-border)]"
        >
          {[
            { value: "%40", label: "Zaman Tasarrufu" },
            { value: "%65", label: "Verimlilik Artışı" },
            { value: "7/24", label: "Kesintisiz Otomasyon" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--color-muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
