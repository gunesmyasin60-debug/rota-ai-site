"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Download, 
  Brain, 
  Check, 
  Copy, 
  Workflow, 
  Database, 
  Store, 
  ArrowRight, 
  HelpCircle,
  Activity,
  Utensils,
  Home,
  MessageSquare
} from "lucide-react";

interface JargonItem {
  id: string;
  icon: React.ReactNode;
  term: string;
  simpleTerm: string;
  description: string;
  prompt: string;
}

export default function KobiTranslator() {
  const [activeTab, setActiveTab] = useState<"translator" | "sectors">("translator");
  const [selectedJargon, setSelectedJargon] = useState<string>("crm");
  const [selectedSector, setSelectedSector] = useState<string>("clinic");
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const jargonList: JargonItem[] = [
    {
      id: "crm",
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      term: "CRM Entegrasyonu",
      simpleTerm: "Müşteri Defterinin Akıllı ve Dijital Hali",
      description: "Arayan, WhatsApp'tan yazan veya randevu alan tüm müşterilerinizi kaybolan kağıt defterler yerine tek bir güvenli ekranda toplar. Kimin ne zaman ne istediğini tek tıkla görür, müşterilerinizi asla unutmazsınız.",
      prompt: "Ben bir KOBİ sahibiyim. İşletmeme akıllı bir Müşteri Defteri (CRM) entegrasyonu kurmanın bana ne gibi faydaları olur? Teknik terim kullanmadan esnaf diliyle anlatır mısın?"
    },
    {
      id: "agent",
      icon: <Brain className="w-5 h-5 text-indigo-400" />,
      term: "Yapay Zekâ Satış Ajanı",
      simpleTerm: "7/24 Telefon Başında Bekleyen Sanal Sekreter",
      description: "Siz uyurken, araba sürerken, tatildeyken veya başka bir iş yaparken gelen WhatsApp mesajlarına saniyeler içinde son derece kibar ve akıllıca cevap verip randevu yazan veya sipariş alan sanal çalışanınız.",
      prompt: "Bir KOBİ sahibi olarak 7/24 WhatsApp üzerinden müşterilerime anında yanıt veren bir Yapay Zeka Satış Ajanı kurarsam, bu müşteri memnuniyetimi ve satışlarımı nasıl artırır? Örnekler verir misin?"
    },
    {
      id: "automation",
      icon: <Workflow className="w-5 h-5 text-pink-400" />,
      term: "İş Akış Otomasyonu",
      simpleTerm: "Sistemlerin El Değmeden Kendi Arasında Konuşması",
      description: "Müşteriniz WhatsApp'tan randevu aldığında, bu randevunun sizin takviminize otomatik işlenmesi, müşteriye anında onay SMS'i gitmesi ve gün sonunda size özet rapor gönderilmesi gibi, sistemlerin el değmeden haberleşmesidir.",
      prompt: "KOBİ'mde iş akış otomasyonu kurarak el değmeden işleyen bir sistem kurmak istiyorum. İşletmemde zaman alan manuel süreçleri nasıl otomatikleştirebilirim? Teknik olmayan bir dil kullan lütfen."
    }
  ];

  const sectorCases = [
    {
      id: "clinic",
      icon: <Activity className="w-5 h-5" />,
      title: "Klinik & Sağlık Kabini",
      problem: "Gece gelen randevu mesajlarına geç dönüldüğü için hastalar başka kliniklere gidiyor.",
      solution: "WhatsApp botu gece-gündüz hastaya müsait saatleri sunar, randevuyu alır, takviminize işler ve hastaya hatırlatma SMS'i atar.",
      result: "Sıfır kaçan hasta, 2 kat daha düzenli takvim."
    },
    {
      id: "restaurant",
      icon: <Utensils className="w-5 h-5" />,
      title: "Restoran, Kafe & Pastane",
      problem: "Telefonla sipariş alırken adres yanlış yazılıyor veya hat meşgul olduğu için müşteri siparişten vazgeçiyor.",
      solution: "Müşteri WhatsApp'tan menüyü görür, siparişini verir, ödeme linki ve adresi otomatik olarak doğrudan mutfak ekranınıza düşer.",
      result: "Hatasız sipariş alımı, artan sipariş hacmi."
    },
    {
      id: "estate",
      icon: <Home className="w-5 h-5" />,
      title: "Emlak & Hizmet Sektörü",
      problem: "İlanları soran yüzlerce kişiye sürekli aynı PDF kataloglarını veya detaylı açıklamaları elle göndermek zaman kaybettiriyor.",
      solution: "Müşteri ilanı sorduğu an yapay zeka müşterinin bütçesini öğrenir, filtreler ve eşleşen portföy kataloglarını WhatsApp'tan saniyeler içinde gönderir.",
      result: "Zaman kaybı sıfıra iner, sadece ciddi alıcılarla görüşürsünüz."
    },
    {
      id: "store",
      icon: <Store className="w-5 h-5" />,
      title: "Butik & E-Ticaret",
      problem: "Kargo takibi sormak veya stok sormak için yazan müşteriler destek ekibini çok meşgul ediyor.",
      solution: "Müşteri sipariş numarasını girer, yapay zeka kargo durumunu anında söyler. Ürün stoğunu sorgulayıp benzer ürünleri önerir.",
      result: "Destek yükünde %75 azalma, artan ek satışlar."
    }
  ];

  const handleAskGemini = (promptText: string) => {
    // 1. Kopyalama işlemi ve Toast gösterimi
    try {
      navigator.clipboard.writeText(promptText);
      setCopied(true);
      setToastMessage("Profesyonel sorunuz panoya kopyalandı! Şimdi Gemini'ye sorabilirsiniz.");
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Kopyalama başarısız:", err);
    }
    
    // 2. Senkron yönlendirme (Mobil tarayıcıların popup engelleyicisini aşmak için)
    window.open("https://gemini.google.com/app", "_blank");
  };

  const activeJargon = jargonList.find(j => j.id === selectedJargon) || jargonList[0];
  const activeSector = sectorCases.find(s => s.id === selectedSector) || sectorCases[0];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white" id="kobi-dostu">
      {/* Arka Plan Glow Efektleri */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Başlık Grubu */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-badge mb-4 inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            %100 Sade Dil, Sıfır Teknik Terim
          </div>
          <h2 className="heading-lg mt-4">
            KOBİ Dostu <span className="gradient-text">Yapay Zekâ & Çözüm Tercümanı</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed mt-4 max-w-xl mx-auto">
            Teknoloji dünyasının soğuk ve yabancı kelimelerini esnaf diline tercüme ettik. 
            ROTA-AI otomasyonlarının işletmenize nasıl kazanç sağlayacağını anlaşılır şekilde inceleyin.
          </p>
        </div>

        {/* Tab Seçimi */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-sm">
            <button
              onClick={() => setActiveTab("translator")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "translator"
                  ? "bg-[var(--color-primary)] text-white shadow-md shadow-indigo-900/20"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Kelime Tercümanı
            </button>
            <button
              onClick={() => setActiveTab("sectors")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "sectors"
                  ? "bg-[var(--color-primary)] text-white shadow-md shadow-indigo-900/20"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Store className="w-4 h-4" />
              Sektörünüze Özel Çözümler
            </button>
          </div>
        </div>

        {/* İçerik Alanı */}
        <AnimatePresence mode="wait">
          {activeTab === "translator" ? (
            <motion.div
              key="translator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Sol Taraf: Terim Listesi */}
              <div className="col-span-1 lg:col-span-4 space-y-4">
                {jargonList.map((item) => {
                  const isActive = selectedJargon === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedJargon(item.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer ${
                        isActive
                          ? "bg-white border-[var(--color-primary)]/50 shadow-lg shadow-indigo-900/5 scale-102"
                          : "bg-white/50 border-slate-200/80 hover:border-slate-300/80 hover:bg-white/80 backdrop-blur-sm"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
                        isActive ? "bg-indigo-50 text-[var(--color-primary)]" : "bg-slate-100 text-slate-500"
                      }`}>
                        {React.cloneElement(item.icon as React.ReactElement<any>, {
                          className: `w-5 h-5 ${isActive ? "text-[var(--color-primary)]" : "text-slate-500"}`
                        })}
                      </div>
                      <div>
                        <h4 className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Teknik Terim</h4>
                        <h3 className="text-slate-800 text-xs font-bold mt-0.5">{item.term}</h3>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Sağ Taraf: Detaylı Tercüme ve Akıllı Eylemler */}
              <div className="col-span-1 lg:col-span-8 bg-white/70 border border-slate-200/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl shadow-slate-100/50">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                  <div>
                    <span className="text-[9px] text-[var(--color-primary)] font-bold uppercase bg-indigo-50 px-2.5 py-0.5 rounded-md">
                      TÜRKÇE KARŞILIĞI
                    </span>
                    <h3 className="text-slate-900 text-lg md:text-xl font-extrabold mt-2 tracking-tight">
                      {activeJargon.simpleTerm}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-650 text-xs md:text-sm leading-relaxed mb-8">
                  {activeJargon.description}
                </p>

                {/* Butonlar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Gemini Butonu */}
                  <button
                    onClick={() => handleAskGemini(activeJargon.prompt)}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-900/20 active:scale-98 relative group cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-violet-200 group-hover:animate-pulse" />
                    Google Gemini AI'a Sor
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>

                  {/* Rehber PDF Butonu */}
                  <a
                    href="/docs/kobi-dostu-rehber.txt"
                    download
                    className="flex items-center justify-center gap-3 bg-slate-100 hover:bg-indigo-50/50 text-slate-700 hover:text-[var(--color-primary)] font-bold py-3.5 px-6 rounded-2xl text-xs border border-slate-200 transition-all active:scale-98 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[var(--color-primary)]" />
                    KOBİ Yapay Zekâ El Kitabını İndir (Sade Metin)
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sectors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Sol Taraf: Sektör Seçimi */}
              <div className="col-span-1 lg:col-span-4 flex flex-col gap-3">
                {sectorCases.map((sec) => {
                  const isActive = selectedSector === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSector(sec.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-white border-[var(--color-primary)]/50 shadow-lg shadow-indigo-900/5 scale-102"
                          : "bg-white/50 border-slate-200/80 hover:border-slate-300/80 hover:bg-white/80 backdrop-blur-sm"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
                          isActive ? "bg-[var(--color-primary)] text-white shadow-md shadow-indigo-900/20" : "bg-slate-100 text-slate-500"
                        }`}>
                          {sec.icon}
                        </div>
                        <span className={`text-xs font-bold ${isActive ? "text-slate-900" : "text-slate-600"}`}>{sec.title}</span>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform ${
                        isActive ? "text-[var(--color-primary)] translate-x-1" : "text-slate-400"
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Sağ Taraf: Sektör Özel Senaryosu */}
              <div className="col-span-1 lg:col-span-8 bg-white/70 border border-slate-200/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl shadow-slate-100/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
                    <div className="w-8 h-8 bg-indigo-50 text-[var(--color-primary)] rounded-lg flex items-center justify-center">
                      {activeSector.icon}
                    </div>
                    <h3 className="text-slate-850 text-sm font-bold">{activeSector.title}</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-[8px] bg-red-50 text-red-500 border border-red-100 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                        Sık Karşılaşılan Sorun
                      </span>
                      <p className="text-slate-650 text-xs mt-2 italic leading-relaxed">
                        &ldquo;{activeSector.problem}&rdquo;
                      </p>
                    </div>

                    <div>
                      <span className="text-[8px] bg-indigo-50 text-[var(--color-primary)] border border-indigo-100 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                        ROTA-AI Otomasyon Çözümü
                      </span>
                      <p className="text-slate-800 text-xs mt-2 font-semibold leading-relaxed">
                        {activeSector.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase">NET İŞ SONUCU</span>
                    <p className="text-[var(--color-primary)] text-sm font-extrabold mt-1">{activeSector.result}</p>
                  </div>
                  <a
                    href="#contact"
                    className="text-xs text-white font-bold bg-[var(--color-primary)] hover:bg-indigo-500 px-5 py-2.5 rounded-xl transition-all hover:scale-103 shadow-md shadow-indigo-900/10 cursor-pointer"
                  >
                    Bunun Hakkında Görüşelim
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Toast Bildirimi */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/95 border border-indigo-100 p-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 backdrop-blur-md max-w-sm w-[90%]"
            >
              <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-[var(--color-primary)] shrink-0">
                <Check className="w-4 h-4 animate-scaleUp" />
              </div>
              <p className="text-slate-800 text-[11px] leading-snug font-medium">
                {toastMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
