"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="iletisim">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-flex">İletişim</span>
          <h2 className="heading-lg mt-4">
            Projenizi <span className="gradient-text">Konuşalım</span>
          </h2>
          <p className="text-[var(--color-muted)] mt-4 max-w-xl mx-auto text-base md:text-lg">
            Ücretsiz analiz ve teklif için formu doldurun, 24 saat içinde size dönüş yapalım.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="glass-card p-6">
              <div className="w-10 h-10 rounded-xl bg-[rgba(99,102,241,0.1)] flex items-center justify-center mb-3">
                <Mail size={18} className="text-[var(--color-primary)]" />
              </div>
              <h3 className="font-bold text-[var(--color-dark)] mb-1">E-posta</h3>
              <a
                href="mailto:muyagunesyasim@gmail.com"
                className="text-sm text-[var(--color-primary)] hover:underline break-all"
              >
                muyagunesyasim@gmail.com
              </a>
            </div>

            <div className="glass-card p-6">
              <div className="w-10 h-10 rounded-xl bg-[rgba(99,102,241,0.1)] flex items-center justify-center mb-3">
                <MapPin size={18} className="text-[var(--color-primary)]" />
              </div>
              <h3 className="font-bold text-[var(--color-dark)] mb-1">Konum</h3>
              <p className="text-sm text-[var(--color-muted)]">İstanbul, Türkiye</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Adınız"
                  required
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="İşletme Adı"
                  className="form-input"
                />
              </div>
              <input
                type="email"
                placeholder="E-posta Adresiniz"
                required
                className="form-input"
              />
              <select className="form-input text-[var(--color-muted-light)]" defaultValue="">
                <option value="" disabled>
                  Hizmet Seçin
                </option>
                <option>Web Geliştirme</option>
                <option>AI Otomasyon</option>
                <option>Sosyal Medya</option>
                <option>E-Ticaret Otomasyonu</option>
                <option>İçerik Üretimi</option>
                <option>Uygulama Geliştirme</option>
              </select>
              <textarea
                placeholder="Projeniz hakkında kısaca bilgi verin..."
                rows={4}
                className="form-input resize-none"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full justify-center mt-2"
              >
                {submitted ? (
                  "✓ Mesajınız Gönderildi!"
                ) : (
                  <>
                    Gönder
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
