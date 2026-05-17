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
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setToastMessage("Profesyonel sorunuz panoya kopyalandı! Şimdi Gemini'ye sorabilirsiniz.");
    
    setTimeout(() => {
      setCopied(false);
      window.open("https://gemini.google.com/app", "_blank");
    }, 2000);
  };

  const activeJargon = jargonList.find(j => j.id === selectedJargon) || jargonList[0];
  const activeSector = sectorCases.find(s => s.id === selectedSector) || sectorCases[0];

  return (
    <section className="py-20 relative overflow-hidden bg-slate-950" id="kobi-dostu">
      {/* Arka Plan Glow Efektleri */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Başlık Grubu */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            %100 Sade Dil, Sıfır Teknik Terim
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            KOBİ Dostu Yapay Zekâ & Çözüm Tercümanı
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Teknoloji dünyasının soğuk ve yabancı kelimelerini esnaf diline tercüme ettik. 
            ROTA-AI otomasyonlarının işletmenize nasıl kazanç sağlayacağını anlaşılır şekilde inceleyin.
          </p>
        </div>

        {/* Tab Seçimi */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab("translator")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "translator"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Kelime Tercümanı
            </button>
            <button
              onClick={() => setActiveTab("sectors")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "sectors"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                  : "text-slate-400 hover:text-white"
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
                {jargonList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedJargon(item.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                      selectedJargon === item.id
                        ? "bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-950/20"
                        : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700/80"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${
                      selectedJargon === item.id ? "bg-emerald-500/10" : "bg-slate-800"
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Teknik Terim</h4>
                      <h3 className="text-white text-xs font-bold mt-0.5">{item.term}</h3>
                    </div>
                  </button>
                ))}
              </div>

              {/* Sağ Taraf: Detaylı Tercüme ve Akıllı Eylemler */}
              <div className="col-span-1 lg:col-span-8 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      TÜRKÇE KARŞILIĞI
                    </span>
                    <h3 className="text-white text-lg md:text-xl font-extrabold mt-2">
                      {activeJargon.simpleTerm}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-8">
                  {activeJargon.description}
                </p>

                {/* Butonlar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Gemini Butonu */}
                  <button
                    onClick={() => handleAskGemini(activeJargon.prompt)}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-900/20 active:scale-98 relative group"
                  >
                    <Sparkles className="w-4 h-4 text-violet-200 group-hover:animate-pulse" />
                    Google Gemini AI'a Sor
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>

                  {/* Rehber PDF Butonu */}
                  <a
                    href="/docs/kobi-dostu-rehber.txt"
                    download
                    className="flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3.5 px-6 rounded-2xl text-xs border border-slate-700 transition-all active:scale-98"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
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
                {sectorCases.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSector(sec.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      selectedSector === sec.id
                        ? "bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-950/20"
                        : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700/80"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl ${
                        selectedSector === sec.id ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                      }`}>
                        {sec.icon}
                      </div>
                      <span className="text-white text-xs font-bold">{sec.title}</span>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${
                      selectedSector === sec.id ? "text-emerald-400 translate-x-1" : "text-slate-600"
                    }`} />
                  </button>
                ))}
              </div>

              {/* Sağ Taraf: Sektör Özel Senaryosu */}
              <div className="col-span-1 lg:col-span-8 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-6">
                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                      {activeSector.icon}
                    </div>
                    <h3 className="text-white text-md font-bold">{activeSector.title}</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                        Sık Karşılaşılan Sorun
                      </span>
                      <p className="text-slate-300 text-xs mt-2 italic leading-relaxed">
                        &ldquo;{activeSector.problem}&rdquo;
                      </p>
                    </div>

                    <div>
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                        ROTA-AI Otomasyon Çözümü
                      </span>
                      <p className="text-white text-xs mt-2 font-medium leading-relaxed">
                        {activeSector.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase">NET İŞ SONUCU</span>
                    <p className="text-emerald-400 text-sm font-extrabold mt-1">{activeSector.result}</p>
                  </div>
                  <a
                    href="#contact"
                    className="text-xs text-white font-bold bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 rounded-xl transition-all hover:scale-103"
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
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-indigo-500/50 p-4 rounded-2xl shadow-xl z-50 flex items-center gap-3 backdrop-blur-md max-w-sm w-[90%]"
            >
              <div className="w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 shrink-0">
                <Check className="w-4 h-4 animate-scaleUp" />
              </div>
              <p className="text-white text-[11px] leading-snug font-medium">
                {toastMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
