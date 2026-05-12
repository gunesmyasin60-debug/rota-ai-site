"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "ROTA-AI hangi hizmetleri sunuyor?",
    a: "Web geliştirme, AI otomasyon, sosyal medya yönetimi, e-ticaret otomasyonu, içerik üretimi ve uygulama geliştirme gibi uçtan uca dijital çözümler sunuyoruz.",
  },
  {
    q: "Bir proje ne kadar sürede tamamlanır?",
    a: "Projenin kapsamına göre değişmekle birlikte, tüm projelerimizi maksimum 1 hafta içinde tamamlayıp teslim ediyoruz.",
  },
  {
    q: "Fiyatlandırma nasıl belirleniyor?",
    a: "Her proje için ücretsiz analiz yapıyor ve ihtiyaçlarınıza özel şeffaf bir teklif sunuyoruz. Gizli maliyet veya sürpriz fatura yoktur.",
  },
  {
    q: "Proje sonrası destek veriyor musunuz?",
    a: "Evet, tüm projelerimizde lansman sonrası teknik destek ve bakım hizmeti sunuyoruz. Performans takibi ve sürekli iyileştirmeler standart hizmetimizin bir parçasıdır.",
  },
  {
    q: "Hangi sektörlere hizmet veriyorsunuz?",
    a: "Gıda, sağlık, eğitim, perakende, e-ticaret ve hizmet sektörü başta olmak üzere dijital dönüşüm ihtiyacı olan her sektöre hizmet veriyoruz.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="sss" className="bg-[var(--color-surface)]">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-flex">SSS</span>
          <h2 className="heading-lg mt-4">
            Sıkça Sorulan <span className="gradient-text">Sorular</span>
          </h2>
        </motion.div>

        {/* Items */}
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="faq-item"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm md:text-base font-semibold text-[var(--color-dark)] pr-4">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 135 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 w-7 h-7 rounded-full bg-[rgba(99,102,241,0.1)] flex items-center justify-center"
                >
                  <Plus size={14} className="text-[var(--color-primary)]" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-[var(--color-muted)] leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
