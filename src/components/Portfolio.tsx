"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Bahtiyar Hoca",
    category: "Din & Eğitim Platformu",
    desc: "Kapsamlı eğitim içerikleri sunan, modern ve kullanıcı dostu bir dijital platform.",
    url: "https://bahtiyarhoca.com",
    img: "fetva",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "A'saftat Baklava",
    category: "Gıda & E-ticaret",
    desc: "Geleneksel lezzetleri modern tasarımla buluşturan, sipariş odaklı landing page.",
    url: "https://asaftat-baklava.vercel.app",
    img: "asaftat",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "İstanbul Şifa",
    category: "Sağlık Kabini & Klinik",
    desc: "7/24 hizmet sunan sağlık kabini için hızlı ve mobil öncelikli online randevu ve acil arama sistemi.",
    url: "https://istanbul-sifa.vercel.app",
    img: "istanbul-sifa",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    title: "Psikolog Klinik Demo",
    category: "Sağlık & Randevu Sistemi",
    desc: "Online randevu sistemi entegreli, premium tasarımlı klinik web sitesi.",
    url: "https://psychology-futuristic-web.vercel.app",
    img: "psikolog",
    gradient: "from-violet-500 to-fuchsia-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Portfolio() {
  return (
    <section id="portfolyo" className="bg-[var(--color-surface)] py-24">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-flex">Portfolyo</span>
          <h2 className="heading-lg mt-4">
            Premium <span className="gradient-text">Teknoloji Vitrini</span>
          </h2>
          <p className="text-[var(--color-muted)] mt-4 max-w-xl mx-auto text-base md:text-lg">
            Kod kalitemizi, hız performansımızı ve özgün tasarım estetiğimizi birebir deneyimleyebileceğiniz canlı konsept çalışmalarımız.
          </p>
        </motion.div>

        {/* Project Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {projects.map((project) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-card overflow-hidden group block"
            >
              {/* Project Image */}
              <div className="h-44 relative overflow-hidden">
                <img 
                  src={`/portfolio/${project.img}.png`}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <ExternalLink size={14} className="text-white" />
                </div>
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-[10px] font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-base font-bold text-[var(--color-dark)] mt-1 mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed line-clamp-3">
                  {project.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
