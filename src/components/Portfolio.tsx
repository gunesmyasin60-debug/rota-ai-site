"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Bahtiyar Hoca",
    category: "Din & Eğitim Platformu",
    desc: "Kapsamlı eğitim içerikleri sunan, modern ve kullanıcı dostu bir dijital platform.",
    url: "https://bahtiyarhoca.com",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "A'saftat Baklava",
    category: "Gıda & E-ticaret",
    desc: "Geleneksel lezzetleri modern tasarımla buluşturan, sipariş odaklı landing page.",
    url: "https://asaftat-baklava.vercel.app",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Psikolog Klinik Demo",
    category: "Sağlık & Randevu Sistemi",
    desc: "Online randevu sistemi entegreli, premium tasarımlı klinik web sitesi.",
    url: "https://psychology-futuristic-web.vercel.app",
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
    <section id="portfolyo" className="bg-[var(--color-surface)]">
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
            Gerçek <span className="gradient-text">Projelerimiz</span>
          </h2>
          <p className="text-[var(--color-muted)] mt-4 max-w-xl mx-auto text-base md:text-lg">
            Dijital yetkinliğimizi kanıtlayan, bizzat geliştirdiğimiz canlı projeler.
          </p>
        </motion.div>

        {/* Project Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={`/portfolio/${project.title === "Bahtiyar Hoca" ? "fetva" : project.title === "A'saftat Baklava" ? "asaftat" : "psikolog"}.png`}
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
              <div className="p-6">
                <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-[var(--color-dark)] mt-1 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2">
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
