"use client";

import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Hizmetler",
    links: [
      { label: "Web Geliştirme", href: "#hizmetler" },
      { label: "AI Otomasyon", href: "#hizmetler" },
      { label: "Sosyal Medya", href: "#hizmetler" },
      { label: "E-Ticaret", href: "#hizmetler" },
    ],
  },
  {
    title: "Şirket",
    links: [
      { label: "Sürecimiz", href: "#surec" },
      { label: "Portfolyo", href: "#portfolyo" },
      { label: "SSS", href: "#sss" },
      { label: "İletişim", href: "#iletisim" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-white pt-16 pb-8">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-lg tracking-tight">
                ROTA<span className="text-[var(--color-primary-light)]">-AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
              Doğru Rota, Akıllı Çözüm. İşletmenizin dijital dönüşüm ortağı olarak web geliştirme,
              AI otomasyon ve dijital çözümler sunuyoruz.
            </p>
            <a
              href="mailto:muyagunesyasim@gmail.com"
              className="text-sm text-[var(--color-primary-light)] hover:underline"
            >
              muyagunesyasim@gmail.com
            </a>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gray-700/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} ROTA-AI. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-gray-500">
            İstanbul, Türkiye
          </p>
        </div>
      </div>
    </footer>
  );
}
