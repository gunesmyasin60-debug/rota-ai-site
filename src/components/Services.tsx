"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Bot,
  Share2,
  ShoppingCart,
  PenTool,
  Smartphone,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Geliştirme",
    desc: "Modern, hızlı ve SEO uyumlu kurumsal web siteleri. Next.js ve React ile yüksek performanslı çözümler.",
    tags: ["Next.js", "React", "Tailwind"],
  },
  {
    icon: Bot,
    title: "AI Otomasyon",
    desc: "Yapay zekâ destekli chatbotlar, sesli asistanlar ve operasyonel iş akışı otomasyonları.",
    tags: ["Chatbot", "Sesli AI", "İş Akışı"],
  },
  {
    icon: Share2,
    title: "Sosyal Medya",
    desc: "İçerik planlama, otomatik paylaşım ve etkileşim yönetimi ile markanızı güçlendirin.",
    tags: ["İçerik", "Planlama", "Etkileşim"],
  },
  {
    icon: ShoppingCart,
    title: "E-Ticaret Otomasyonu",
    desc: "Sipariş yönetimi, stok takibi ve müşteri bilgilendirme süreçlerinin tam otomasyonu.",
    tags: ["Sipariş", "Stok", "Otomasyon"],
  },
  {
    icon: PenTool,
    title: "İçerik Üretimi",
    desc: "AI destekli profesyonel görsel, video ve metin üretimi. Markanız için özgün içerikler.",
    tags: ["Görsel", "Video", "Metin"],
  },
  {
    icon: Smartphone,
    title: "Uygulama Geliştirme",
    desc: "İşletmenize özel mobil ve web uygulamaları. Kullanıcı deneyimi odaklı tasarım.",
    tags: ["Mobil", "Web App", "UI/UX"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Services() {
  return (
    <section id="hizmetler">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-flex">Hizmetlerimiz</span>
          <h2 className="heading-lg mt-4">
            Uçtan Uca <span className="gradient-text">Dijital Çözümler</span>
          </h2>
          <p className="text-[var(--color-muted)] mt-4 max-w-xl mx-auto text-base md:text-lg">
            İşletmenizin her dijital ihtiyacı için profesyonel ve ölçeklenebilir çözümler sunuyoruz.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card p-6 md:p-8 group cursor-default"
              >
                {/* Icon */}
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-2xl bg-[rgba(99,102,241,0.1)] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[var(--color-primary)] group-hover:shadow-lg group-hover:shadow-[rgba(99,102,241,0.3)] group-hover:scale-110"
                >
                  <Icon
                    size={22}
                    className="text-[var(--color-primary)] transition-colors duration-300 group-hover:text-white"
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--color-dark)] mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5">
                  {service.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-surface)] text-[var(--color-muted)] transition-colors duration-300 group-hover:bg-[rgba(99,102,241,0.08)] group-hover:text-[var(--color-primary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
