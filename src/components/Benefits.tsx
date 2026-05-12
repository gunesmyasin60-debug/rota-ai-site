"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Shield, Zap } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Sepet Ortalaması Artışı",
    value: "%35",
    desc: "E-ticaret müşterilerimizin ortalama sepet değerinde sağlanan artış oranı.",
  },
  {
    icon: Clock,
    title: "Zaman Tasarrufu",
    value: "%40",
    desc: "Otomasyon çözümlerimizle günlük operasyonel süreçlerde kazanılan zaman.",
  },
  {
    icon: Shield,
    title: "Fiziki Dükkan Kazancı",
    value: "%25",
    desc: "Dijital dönüşüm sonrası fiziki mağazalardaki ortalama gelir artışı.",
  },
  {
    icon: Zap,
    title: "Verimlilik Artışı",
    value: "%65",
    desc: "AI destekli iş akışlarıyla toplam operasyonel verimlilikte sağlanan iyileşme.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function Benefits() {
  return (
    <section>
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-flex">Sonuçlar</span>
          <h2 className="heading-lg mt-4">
            Gerçek <span className="gradient-text">Sektörel Veriler</span>
          </h2>
          <p className="text-[var(--color-muted)] mt-4 max-w-xl mx-auto text-base md:text-lg">
            Abartısız, şeffaf ve ölçülebilir sonuçlar. Helal kazancın peşindeyiz.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card p-6 text-center cursor-default group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[rgba(99,102,241,0.1)] flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-[var(--color-primary)] group-hover:shadow-lg group-hover:shadow-[rgba(99,102,241,0.3)]">
                  <Icon
                    size={24}
                    className="text-[var(--color-primary)] transition-colors duration-300 group-hover:text-white"
                  />
                </div>
                <div className="text-3xl font-extrabold gradient-text mb-1">{item.value}</div>
                <h3 className="text-base font-bold text-[var(--color-dark)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
