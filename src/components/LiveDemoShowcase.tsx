"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, Send, CheckCheck, Play, RotateCcw, ShieldCheck, HeartPulse, ShoppingBag, Briefcase } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
  isButtonOptions?: boolean;
  options?: string[];
}

interface ChatNode {
  botResponse: (name: string) => string;
  options?: string[];
  nextNodes?: Record<string, string>;
}

// Son derece gelişmiş ve derin dallanan diyalog ağacı
const chatTree: Record<string, Record<string, ChatNode>> = {
  clinic: {
    start: {
      botResponse: (name) => `Merhaba ${name} Bey/Hanım! ROTA Klinik & Tıp Merkezi'ne hoş geldiniz. 🌟 Yarın saat 14:00 için Dr. Kerem Bey'e yaptığınız randevu talebiniz sistemimizde başarıyla oluşturulmuştur.`,
      options: ["Evet, Onaylıyorum", "Saati Değiştir"],
      nextNodes: {
        "Evet, Onaylıyorum": "confirm",
        "Saati Değiştir": "change_time",
      }
    },
    confirm: {
      botResponse: () => `Harika! Randevunuz başarıyla onaylandı. Ek olarak, ilk defa geleceğiniz için sormak isteriz: Kliniğimize ilk defa mı geliyorsunuz yoksa kayıtlı hastamız mısınız?`,
      options: ["İlk defa geliyorum", "Kayıtlı hastayım"],
      nextNodes: {
        "İlk defa geliyorum": "first_time",
        "Kayıtlı hastayım": "registered",
      }
    },
    first_time: {
      botResponse: () => `ROTA Klinik'e hoş geldiniz! 🩺 Size özel bir 'Yeni Hasta Bilgilendirme Formu' hazırladık. Randevudan 10 dakika önce gelip formu doldurabilirsiniz. Hızlı konum tarifi ister misiniz?`,
      options: ["Evet, konum atın", "Gerek yok, teşekkürler"],
      nextNodes: {
        "Evet, konum atın": "send_location",
        "Gerek yok, teşekkürler": "no_location",
      }
    },
    send_location: {
      botResponse: () => `📍 Kadıköy Merkez Şubemiz: https://maps.google.com/xyz\n\nKayıt işlemleriniz tamamlanmıştır. Yarın saat 14:00'te görüşmek üzere, sağlıklı günler dileriz! 🩺`,
    },
    no_location: {
      botResponse: () => `Anlaşıldı! Kayıt işlemleriniz tamamlanmıştır. Yarın saat 14:00'te görüşmek üzere, sağlıklı ve mutlu günler dileriz! 🩺`,
    },
    registered: {
      botResponse: () => `Tekrar hoş geldiniz! Bilgileriniz sistemimizde mevcuttur. Yarın saat 14:00'te görüşmek üzere, sağlıklı ve mutlu günler dileriz! ✨`,
    },
    change_time: {
      botResponse: () => `Elbette! Dr. Kerem Bey'in yarın için diğer müsait saatleri: 10:30 ve 16:00. Hangisini tercih edersiniz?`,
      options: ["10:30 tercih ederim", "16:00 tercih ederim"],
      nextNodes: {
        "10:30 tercih ederim": "time_1030",
        "16:00 tercih ederim": "time_1600",
      }
    },
    time_1030: {
      botResponse: () => `Yeni randevunuz yarın saat 10:30 olarak güncellenmiştir! 🗓️ Size onay SMS'i gönderilmiştir. Görüşmek üzere, sağlıklı günler dileriz!`,
    },
    time_1600: {
      botResponse: () => `Yeni randevunuz yarın saat 16:00 olarak güncellenmiştir! 🗓️ Size onay SMS'i gönderilmiştir. Görüşmek üzere, sağlıklı günler dileriz!`,
    }
  },
  
  ecommerce: {
    start: {
      botResponse: (name) => `Selam ${name}! 🛍️ ROTA Butik'te sepetinde harika ürünler unutmuşsun. Senin için hepsini 24 saatliğine ayırdık ve kilitledik!`,
      options: ["%15 İndirimi Uygula", "Kargo Ücretsiz Olsun"],
      nextNodes: {
        "%15 İndirimi Uygula": "apply_discount",
        "Kargo Ücretsiz Olsun": "free_shipping",
      }
    },
    apply_discount: {
      botResponse: () => `Mükemmel tercih! 🚀 %15 özel indirim kodun **ROTA15** sepetine başarıyla uygulandı. Alışverişi şimdi tamamlamak ister misin?`,
      options: ["Evet, ödemeye geç", "Ürünlerime tekrar bakayım"],
      nextNodes: {
        "Evet, ödemeye geç": "go_checkout",
        "Ürünlerime tekrar bakayım": "look_products",
      }
    },
    go_checkout: {
      botResponse: () => `Süper! Güvenli ödeme sayfasına yönlendiriliyorsun: rota-ai-butik.com/checkout. Kodu kullanmayı unutma! 🛍️ Keyifli alışverişler!`,
    },
    look_products: {
      botResponse: () => `Elbette! Popüler kategorilerimizdeki yeni gelen diğer ürünlerimizi incelemek için: rota-ai-butik.com/yeni. İndirim kodun 24 saat boyunca aktiftir! ✨`,
    },
    free_shipping: {
      botResponse: () => `Harika! 🚚 Kargo ücretini sepetinden sildik. Şimdi sepetini güncel ücretsiz kargo fırsatıyla tamamlamak ister misin?`,
      options: ["Evet, satın al", "Başka bir sorum var"],
      nextNodes: {
        "Evet, satın al": "go_checkout",
        "Başka bir sorum var": "need_support",
      }
    },
    need_support: {
      botResponse: () => `Size yardımcı olmaktan mutluluk duyarız! Müşteri temsilcimiz 5 dakika içinde bu sohbet üzerinden sizinle iletişime geçecektir. 💬`,
    }
  },
  
  b2b: {
    start: {
      botResponse: (name) => `Sayın ${name} merhaba, Rota-AI ekibi olarak işletmeniz için hazırladığımız özel iş akış otomasyonu ve dijital dönüşüm teklif sunumumuz hazır! 📑`,
      options: ["Teklifi PDF Olarak Gönder", "Detayları Burada Konuşalım"],
      nextNodes: {
        "Teklifi PDF Olarak Gönder": "send_pdf",
        "Detayları Burada Konuşalım": "chat_details",
      }
    },
    send_pdf: {
      botResponse: () => `Teklif dosyanız başarıyla iletildi: **rota_ai_teklif_sunumu.pdf** 📑\n\nPeki, otomasyon çözümlerinden en çok hangi alanda verim sağlamak istersiniz?`,
      options: ["Zaman tasarrufu & Hız", "Hataları sıfırlamak"],
      nextNodes: {
        "Zaman tasarrufu & Hız": "save_time",
        "Hataları sıfırlamak": "zero_errors",
      }
    },
    save_time: {
      botResponse: () => `Kesinlikle! AI otomasyonlarımız haftalık 15+ saatlik rutin işleri tamamen otonom hale getiriyor. Konuyu detaylandırmak için 10 dakikalık bir demo görüşmesi planlayalım mı?`,
      options: ["Evet, planlayalım", "E-posta ile devam edelim"],
      nextNodes: {
        "Evet, planlayalım": "schedule_call",
        "E-posta ile devam edelim": "mail_continue",
      }
    },
    zero_errors: {
      botResponse: () => `Harika bir hedef! İnsan hatasını sıfıra indiren veri akışı otomasyonlarımız, veri senkronizasyonunu hatasız yapar. Kısa bir toplantı ile işletmenizi analiz edelim mi?`,
      options: ["Evet, planlayalım", "Daha sonra görüşelim"],
      nextNodes: {
        "Evet, planlayalım": "schedule_call",
        "Daha sonra görüşelim": "no_schedule",
      }
    },
    schedule_call: {
      botResponse: () => `Mükemmel! Müsait zamanlarınızı belirlemek için temsilcimiz 5 dakika içinde size ulaşacaktır. Geleceği birlikte inşa etmek için sabırsızlanıyoruz! 🤝`,
    },
    mail_continue: {
      botResponse: () => `Anlaşıldı. Detaylı çalışma süreçlerimizi içeren sunumu e-postanıza ilettik. Sorularınız olursa dilediğiniz zaman yanıtlayabilirsiniz! ✉️`,
    },
    no_schedule: {
      botResponse: () => `Elbette, ne zaman isterseniz! İşletmenizi geleceğe taşımak istediğinizde buradayız. İyi çalışmalar dileriz! 🚀`,
    },
    chat_details: {
      botResponse: () => `Memnuniyetle! İşletmenizde şu an en çok zaman alan veya manuel yürütülen süreç hangisidir?`,
      options: ["Müşteri sorularını yanıtlamak", "Veri girişi & Raporlama"],
      nextNodes: {
        "Müşteri sorularını yanıtlamak": "customer_support_opt",
        "Veri girişi & Raporlama": "data_entry_opt",
      }
    },
    customer_support_opt: {
      botResponse: () => `7/24 kesintisiz çalışan AI destek asistanımız tam size göre! Bu asistan, sorulara 2 saniyede yanıt vererek randevu oluşturabilir. Canlı demo görüşmesi ister misiniz?`,
      options: ["Evet, planlayalım", "Sadece bilgi almak istiyorum"],
      nextNodes: {
        "Evet, planlayalım": "schedule_call",
        "Sadece bilgi almak istiyorum": "mail_continue",
      }
    },
    data_entry_opt: {
      botResponse: () => `CRM ve excel tabloları arasındaki veri akışını sıfır hata ile otomatize edebiliriz. Bu, operasyonel yükü %80 azaltır. Detaylı demo ister misiniz?`,
      options: ["Evet, planlayalım", "Daha sonra görüşelim"],
      nextNodes: {
        "Evet, planlayalım": "schedule_call",
        "Daha sonra görüşelim": "no_schedule",
      }
    }
  }
};

export default function LiveDemoShowcase() {
  const [name, setName] = useState("");
  const [scenario, setScenario] = useState<"clinic" | "ecommerce" | "b2b">("clinic");
  const [simulationState, setSimulationState] = useState<"idle" | "typing" | "active" | "completed">("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentNode, setCurrentNode] = useState("start");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Web Audio API ile WhatsApp Bildirim Sesi Sentezleme
  const playPing = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn("Ses sentezi başarısız oldu:", e);
    }
  };

  const getSystemTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Scroll to bottom only inside the chat container
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const startSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSimulationState("active");
    setMessages([]);
    setCurrentNode("start");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      playPing();
      
      const startNode = chatTree[scenario]["start"];
      const initialMsg = startNode.botResponse(name);

      setMessages([
        {
          id: "1",
          sender: "bot",
          text: initialMsg,
          time: getSystemTime(),
          status: "read",
          isButtonOptions: true,
          options: startNode.options,
        },
      ]);
    }, 1500);
  };

  const handleOptionClick = (option: string) => {
    // Kullanıcı mesajını ekle ve eski butonları devredışı bırak
    const userMsgId = Date.now().toString();
    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, isButtonOptions: false })),
      {
        id: userMsgId,
        sender: "user",
        text: option,
        time: getSystemTime(),
        status: "read",
      },
    ]);

    setIsTyping(true);

    // Bir sonraki diyalog düğümünü (node) bul
    const currentScenarioTree = chatTree[scenario];
    const currentNodeData = currentScenarioTree[currentNode];
    const nextNodeKey = currentNodeData.nextNodes?.[option];

    if (!nextNodeKey || !currentScenarioTree[nextNodeKey]) {
      setIsTyping(false);
      setSimulationState("completed");
      return;
    }

    const nextNodeData = currentScenarioTree[nextNodeKey];

    // Bot cevabını simüle et
    setTimeout(() => {
      setIsTyping(false);
      playPing();

      const botReplyText = nextNodeData.botResponse(name);
      const botMsgId = (Date.now() + 1).toString();

      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          sender: "bot",
          text: botReplyText,
          time: getSystemTime(),
          status: "read",
          isButtonOptions: !!nextNodeData.options,
          options: nextNodeData.options,
        },
      ]);

      setCurrentNode(nextNodeKey);

      // Seçenekler bittiyse tamamlandı durumuna geç
      if (!nextNodeData.options || nextNodeData.options.length === 0) {
        setSimulationState("completed");
      }
    }, 1500);
  };

  const resetSimulation = () => {
    setMessages([]);
    setSimulationState("idle");
    setName("");
    setCurrentNode("start");
  };

  return (
    <section id="demo" className="py-24 relative overflow-hidden bg-slate-50/50">
      {/* Dekoratif Arka Plan Işıkları */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10" />

      <div className="container-main">
        {/* Başlık Bölümü */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-badge mb-4">
            <ShieldCheck className="w-4 h-4 mr-1 text-primary" /> Canlı Deneyim & İkna Motoru
          </span>
          <h2 className="heading-lg mb-6">
            Yapay Zekânın Gücünü <span className="gradient-text">Bizzat Deneyimleyin</span>
          </h2>
          <p className="text-muted text-lg">
            Sadece vaat vermiyoruz. İşletmenizin müşterileriyle nasıl kurumsal, akıllı ve anlık 
            iletişim kuracağını sağdaki telefon simülatörü üzerinden hemen test edin.
          </p>
        </div>

        {/* Ana Izgara Yapısı (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Sol Kolon: Kontroller */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-8 border border-slate-200/60 bg-white/90 shadow-xl">
              <h3 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" /> 1. Senaryoyu Seçin
              </h3>
              
              {/* Senaryo Seçici */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <button
                  onClick={() => { resetSimulation(); setScenario("clinic"); }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    scenario === "clinic"
                      ? "border-primary bg-indigo-50/55 text-primary font-semibold shadow-sm"
                      : "border-slate-200 bg-white text-muted hover:border-slate-300"
                  }`}
                >
                  <HeartPulse className="w-5 h-5 mb-2" />
                  <span className="text-xs">Sağlık & Klinik</span>
                </button>
                <button
                  onClick={() => { resetSimulation(); setScenario("ecommerce"); }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    scenario === "ecommerce"
                      ? "border-primary bg-indigo-50/55 text-primary font-semibold shadow-sm"
                      : "border-slate-200 bg-white text-muted hover:border-slate-300"
                  }`}
                >
                  <ShoppingBag className="w-5 h-5 mb-2" />
                  <span className="text-xs">E-Ticaret</span>
                </button>
                <button
                  onClick={() => { resetSimulation(); setScenario("b2b"); }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    scenario === "b2b"
                      ? "border-primary bg-indigo-50/55 text-primary font-semibold shadow-sm"
                      : "border-slate-200 bg-white text-muted hover:border-slate-300"
                  }`}
                >
                  <Briefcase className="w-5 h-5 mb-2" />
                  <span className="text-xs">B2B & Kurumsal</span>
                </button>
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                {simulationState === "idle" ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={startSimulation}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-2">
                        Adınız & Soyadınız
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Örn: Ahmet Yılmaz"
                        className="form-input shadow-sm"
                      />
                    </div>
                    <button type="submit" className="w-full btn-primary mt-2">
                      Simülasyonu Başlat <Send className="w-4 h-4 ml-1" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="active-info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="inline-flex p-3 bg-green-100 text-green-600 rounded-full animate-bounce">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <p className="font-semibold text-dark">
                      {simulationState === "completed"
                        ? "Simülasyon Tamamlandı! 🎉"
                        : "Simülasyon Aktif, Telefonu Yönetin!"}
                    </p>
                    <p className="text-xs text-muted leading-relaxed">
                      {scenario === "clinic" && "Klinik randevu onay ve yönlendirme otomasyonu."}
                      {scenario === "ecommerce" && "E-ticaret sepet kurtarma ve indirim otomasyonu."}
                      {scenario === "b2b" && "B2B teklif sunumu ve demo planlama otomasyonu."}
                    </p>
                    <button
                      onClick={resetSimulation}
                      className="btn-outline flex items-center justify-center mx-auto px-6 py-2 text-sm gap-2 mt-4"
                    >
                      <RotateCcw className="w-4 h-4" /> Yeniden Başlat
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sağ Kolon: 3D Akıllı Telefon Simülatörü */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-[340px] h-[670px] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-4 border-slate-700 glow-ring">
              {/* Ahize & Ön Kamera Boşluğu (Dynamic Island Mock) */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 flex items-center justify-end px-3">
                <div className="w-2.5 h-2.5 bg-neutral-800 rounded-full" />
              </div>

              {/* Ekran İçeriği */}
              <div className="w-full h-full bg-[#E5DDD5] rounded-[40px] overflow-hidden flex flex-col relative">
                {/* Telefon Durum Çubuğu */}
                <div className="h-9 bg-[#075E54] text-white flex justify-between items-center px-6 pt-3 text-[10px] z-10">
                  <span>14:52</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-2 border border-white rounded-sm bg-white" />
                  </div>
                </div>

                {/* WhatsApp Header */}
                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm text-white">
                      R
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs leading-none">ROTA ASİSTAN</h4>
                      <span className="text-[9px] text-green-300">
                        {isTyping ? "yazıyor..." : "çevrimiçi"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 opacity-80">
                    <Phone className="w-4 h-4 cursor-pointer" />
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  </div>
                </div>

                {/* WhatsApp Sohbet Alanı */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 relative"
                  style={{
                    backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
                    backgroundSize: "cover",
                  }}
                >
                  <AnimatePresence>
                    {messages.length === 0 && simulationState === "idle" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/80 backdrop-blur-sm p-4 rounded-xl text-center text-xs text-muted shadow-sm border border-slate-200 mt-20"
                      >
                        Simülasyonu başlatmak için sol paneldeki formu doldurun.
                      </motion.div>
                    )}

                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`flex flex-col max-w-[85%] relative ${
                          msg.sender === "bot" ? "mr-auto" : "ml-auto"
                        }`}
                      >
                        {/* Mesaj Baloncuğu */}
                        <div
                           className={`p-3 rounded-2xl text-xs shadow-sm border ${
                            msg.sender === "bot"
                              ? "bg-white text-dark rounded-tl-none border-slate-100"
                              : "bg-[#DCF8C6] text-dark rounded-tr-none border-[#C7EDB1]"
                          }`}
                        >
                          <p className="whitespace-pre-line leading-relaxed font-sans">{msg.text}</p>
                          <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-muted text-right">
                            <span>{msg.time}</span>
                            <CheckCheck className={`w-3.5 h-3.5 ${msg.sender === "user" ? "text-green-500" : "text-blue-500"}`} />
                          </div>
                        </div>

                        {/* İnteraktif Karar Butonları */}
                        {msg.isButtonOptions && msg.options && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-3 space-y-2"
                          >
                            {msg.options.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => handleOptionClick(opt)}
                                className="w-full bg-white hover:bg-slate-50 text-indigo-600 font-semibold py-2 px-3 rounded-xl border border-slate-200 text-xs text-center shadow transition-all hover:scale-[1.02]"
                              >
                                {opt}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}

                    {/* Yazıyor... Baloncuğu */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mr-auto bg-white p-3 rounded-2xl rounded-tl-none text-xs border border-slate-100 flex items-center gap-1.5 shadow-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={chatEndRef} />
                </div>

                {/* Telefon Giriş Alanı */}
                <div className="bg-[#f0f0f0] p-2 flex items-center gap-2 z-10 border-t border-slate-200">
                  <div className="flex-1 bg-white rounded-full h-8 px-4 flex items-center text-[11px] text-slate-400 border border-slate-200 shadow-inner">
                    Cevabınızı yukarıdan seçin...
                  </div>
                  <div className="w-8 h-8 bg-[#075E54] rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-all">
                    <Send className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
