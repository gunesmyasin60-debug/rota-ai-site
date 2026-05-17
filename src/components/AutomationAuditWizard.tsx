"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, CheckCheck, Phone, RefreshCw, AlertCircle, ShieldCheck } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  isButtonOptions?: boolean;
  options?: string[];
  isCaptcha?: boolean;
}

interface FormData {
  sector: string;
  bottleneck: string;
  website: string;
  email: string;
  turnstileToken: string;
}

export default function AutomationAuditWizard() {
  const [chatStep, setChatStep] = useState<"welcome" | "sector" | "bottleneck" | "website" | "email" | "captcha" | "submitting" | "success">("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    sector: "",
    bottleneck: "",
    website: "",
    email: "",
    turnstileToken: "",
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cloudflare Turnstile Test Site Key
  const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

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

  // İlk karşılama mesajı
  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        playPing();
        setMessages([
          {
            id: "welcome-1",
            sender: "bot",
            text: "Merhaba! ROTA-AI Dijital Röntgen & Büyüme Analizi merkezine hoş geldiniz. 🕵️‍♂️\n\nİşletmenizdeki verimlilik kaçaklarını ve size özel AI entegrasyon fırsatlarını içeren ücretsiz 5 dakikalık Loom video analiz raporunu hazırlayabilmem için size birkaç kısa sorum olacak. Hazır mısınız?",
            time: getSystemTime(),
            isButtonOptions: true,
            options: ["Evet, Analizi Başlatalım! 🚀"],
          }
        ]);
        setChatStep("welcome");
      }, 1000);
    }
  }, []);

  // Cloudflare Turnstile Dinamik Render ve Yükleme
  useEffect(() => {
    if (chatStep === "captcha") {
      if (!(window as any).turnstile) {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        (window as any).onloadTurnstileCallback = () => {
          renderTurnstile();
        };
      } else {
        renderTurnstile();
      }
    }
  }, [chatStep, messages]);

  const renderTurnstile = () => {
    try {
      if ((window as any).turnstile) {
        const container = document.getElementById("chat-turnstile-widget");
        if (container && container.children.length === 0) {
          (window as any).turnstile.render("#chat-turnstile-widget", {
            sitekey: TURNSTILE_SITE_KEY,
            callback: (token: string) => {
              setFormData((prev) => ({ ...prev, turnstileToken: token }));
              setError(null);
              submitData(token);
            },
            "error-callback": () => {
              setError("Güvenlik doğrulaması başarısız oldu. Lütfen sayfayı yenileyip tekrar deneyin.");
            },
          });
        }
      }
    } catch (e) {
      console.error("Turnstile render hatası:", e);
    }
  };

  const handleOptionClick = (option: string) => {
    setError(null);
    
    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, isButtonOptions: false })),
      {
        id: Date.now().toString(),
        sender: "user",
        text: option,
        time: getSystemTime(),
      }
    ]);

    setIsTyping(true);

    if (chatStep === "welcome") {
      setTimeout(() => {
        setIsTyping(false);
        playPing();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Harika! İlk sorumuz: İşletmeniz hangi sektörde faaliyet gösteriyor?",
            time: getSystemTime(),
            isButtonOptions: true,
            options: [
              "Sağlık & Tıp (Klinik, Doktor) 🩺",
              "E-Ticaret & Perakende 🛒",
              "Hizmet & Danışmanlık 💼",
              "Yerel İşletme (Restoran vb.) 📍",
              "Diğer Sektörler 🔹"
            ]
          }
        ]);
        setChatStep("sector");
      }, 1200);
    } 
    else if (chatStep === "sector") {
      setFormData((prev) => ({ ...prev, sector: option }));
      setTimeout(() => {
        setIsTyping(false);
        playPing();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Güzel seçim! Peki şu an işletmenizdeki en büyük dijital darboğaz veya zaman alan süreç hangisidir?",
            time: getSystemTime(),
            isButtonOptions: true,
            options: [
              "7/24 Randevu/Destek hattımızın olmaması",
              "Web sitemizin çok eski, yavaş olması",
              "Müşteri takibinin çok zaman alması",
              "Google aramalarında geride kalmamız",
              "Hepsi / Diğer"
            ]
          }
        ]);
        setChatStep("bottleneck");
      }, 1200);
    }
    else if (chatStep === "bottleneck") {
      setFormData((prev) => ({ ...prev, bottleneck: option }));
      setTimeout(() => {
        setIsTyping(false);
        playPing();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Anlaşıldı. Analiz etmemi istediğiniz web sitenizin adresini yazın veya aşağıdaki butona tıklayın:",
            time: getSystemTime(),
            isButtonOptions: true,
            options: ["Web sitem yok ❌"]
          }
        ]);
        setChatStep("website");
        setTimeout(() => inputRef.current?.focus(), 100);
      }, 1200);
    }
    else if (chatStep === "website" && option === "Web sitem yok ❌") {
      setFormData((prev) => ({ ...prev, website: "Web sitem yok" }));
      goToEmailStep();
    }
  };

  const handleCustomInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setError(null);
    const userInput = inputValue.trim();
    setInputValue("");

    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, isButtonOptions: false })),
      {
        id: Date.now().toString(),
        sender: "user",
        text: userInput,
        time: getSystemTime(),
      }
    ]);

    setIsTyping(true);

    if (chatStep === "website") {
      setFormData((prev) => ({ ...prev, website: userInput }));
      goToEmailStep();
    } 
    else if (chatStep === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInput)) {
        setTimeout(() => {
          setIsTyping(false);
          setError("Lütfen geçerli bir e-posta adresi yazın.");
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: "bot",
              text: "⚠️ Yazdığınız e-posta adresi geçersiz görünüyor. Loom video analizinizi başarıyla ulaştırabilmemiz için lütfen geçerli bir e-posta girin (Örn: isim@firma.com):",
              time: getSystemTime(),
            }
          ]);
          setTimeout(() => inputRef.current?.focus(), 100);
        }, 1000);
        return;
      }

      setFormData((prev) => ({ ...prev, email: userInput }));
      goToCaptchaStep(userInput);
    }
  };

  const goToEmailStep = () => {
    setTimeout(() => {
      setIsTyping(false);
      playPing();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Mükemmel! Son olarak, hazırlayacağımız 5 dakikalık Loom video analiz linkini hangi e-posta adresinize gönderelim? (Lütfen aşağıdaki kutuya yazıp gönderin)",
          time: getSystemTime(),
        }
      ]);
      setChatStep("email");
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 1200);
  };

  const goToCaptchaStep = (email: string) => {
    setTimeout(() => {
      setIsTyping(false);
      playPing();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `Teşekkürler! Analiz raporunuzu **${email}** adresine tanımlıyoruz.\n\nGüvenliğimizi sağlamak için lütfen aşağıdaki bot doğrulamasını tamamlayın:`,
          time: getSystemTime(),
          isCaptcha: true,
        }
      ]);
      setChatStep("captcha");
    }, 1200);
  };

  const submitData = async (token: string) => {
    setIsTyping(true);
    setChatStep("submitting");

    const finalData = {
      ...formData,
      turnstileToken: token,
    };

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "İstek iletilirken bir hata oluştu.");
      }

      setTimeout(() => {
        setIsTyping(false);
        playPing();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "🎉 MÜKEMMEL HABER! Dijital röntgen talebiniz başarıyla veritabanımıza kaydedilmiştir!\n\nMühendislik ekibimiz verdiğiniz bilgiler doğrultusunda analiz çalışmalarına başladı. En geç **24 saat içinde** size özel Loom video analiz linkiniz e-posta adresinize ulaştırılacaktır. Rota-AI'ı tercih ettiğiniz için teşekkür ederiz! 🚀",
            time: getSystemTime(),
          }
        ]);
        setChatStep("success");
      }, 1800);

    } catch (err: any) {
      setIsTyping(false);
      setError(err.message || "Beklenmedik bir hata oluştu.");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `⚠️ Bir hata oluştu: ${err.message || "İstek iletilemedi"}. Lütfen aşağıdaki butona tıklayarak tekrar deneyin.`,
          time: getSystemTime(),
          isButtonOptions: true,
          options: ["Doğrulamayı Tekrarla & Gönder"],
        }
      ]);
      setChatStep("captcha");
    }
  };

  const resetChat = () => {
    setMessages([]);
    setFormData({ sector: "", bottleneck: "", website: "", email: "", turnstileToken: "" });
    setError(null);
    setChatStep("welcome");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      playPing();
      setMessages([
        {
          id: "welcome-1",
          sender: "bot",
          text: "Merhaba! ROTA-AI Dijital Röntgen & Büyüme Analizi merkezine hoş geldiniz. 🕵️‍♂️\n\nİşletmenizdeki verimlilik kaçaklarını ve size özel AI entegrasyon fırsatlarını içeren ücretsiz 5 dakikalık Loom video analiz raporunu hazırlayabilmem için size birkaç kısa sorum olacak. Hazır mısınız?",
          time: getSystemTime(),
          isButtonOptions: true,
          options: ["Evet, Analizi Başlatalım! 🚀"],
        }
      ]);
    }, 1000);
  };

  return (
    <section id="audit" className="py-24 relative overflow-hidden bg-slate-50/50">
      {/* Dekoratif Arka Plan Işıkları */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl -z-10 animate-pulse-soft" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl -z-10 animate-pulse-soft" />

      <div className="container-main max-w-4xl">
        {/* Başlık Bölümü */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-badge mb-4">
            <Sparkles className="w-4 h-4 mr-1 text-primary animate-pulse" /> Akıllı Analiz Botu
          </span>
          <h2 className="heading-lg mb-6">
            5 Dakikalık <span className="gradient-text">Dijital Röntgen Asistanı</span>
          </h2>
          <p className="text-muted text-lg">
            Sıkıcı formları unuttun! İşletmeniz için hazırlayacağımız **ücretsiz Loom video raporunu** 
            istemek için aşağıdaki analiz asistanımızla mesajlaşmaya hemen başlayın.
          </p>
        </div>

        {/* 3D Görünümlü Premium Akıllı Telefon Simülatörü (Üsttekiyle Birebir Aynı) */}
        <div className="flex justify-center">
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
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-inner">
                    AI
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs leading-none flex items-center gap-1.5">
                      ROTA ASİSTAN
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                    </h4>
                    <span className="text-[9px] text-green-300">
                      {isTyping ? "yazıyor..." : "çevrimiçi"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-80">
                  <Phone className="w-4 h-4 cursor-pointer hover:scale-110 transition-all" />
                  <span className="text-[8px] bg-green-600/50 px-1.5 py-0.5 rounded-full border border-green-500 text-[8px]">
                    Ücretsiz
                  </span>
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
                        className={`p-3 rounded-2xl text-[11px] shadow-sm border ${
                          msg.sender === "bot"
                            ? "bg-white text-dark rounded-tl-none border-slate-100"
                            : "bg-[#DCF8C6] text-dark rounded-tr-none border-[#C7EDB1]"
                        }`}
                      >
                        <p className="whitespace-pre-line leading-relaxed font-sans font-medium text-slate-800">{msg.text}</p>
                        
                        {/* Cloudflare Turnstile Sohbet İçi Entegrasyonu */}
                        {msg.isCaptcha && (
                          <div className="mt-3 p-1.5 bg-slate-50 rounded-xl border border-slate-200 shadow-inner flex flex-col items-center justify-center min-h-[90px]">
                            <div id="chat-turnstile-widget" className="scale-[0.8] origin-center" />
                            {error && (
                              <p className="text-[9px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 shrink-0" /> {error}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-1 mt-1 text-[8px] text-slate-400 text-right">
                          <span>{msg.time}</span>
                          <CheckCheck className={`w-3 h-3 ${msg.sender === "user" ? "text-green-500" : "text-blue-500"}`} />
                        </div>
                      </div>

                      {/* Karar Butonları */}
                      {msg.isButtonOptions && msg.options && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="mt-3 space-y-2 animate-pulse-soft"
                        >
                          {msg.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => {
                                if (opt === "Doğrulamayı Tekrarla & Gönder") {
                                  renderTurnstile();
                                } else {
                                  handleOptionClick(opt);
                                }
                              }}
                              className="w-full bg-white hover:bg-slate-50 text-indigo-600 font-bold py-2 px-2.5 rounded-xl border border-slate-200 text-[10px] text-center shadow-md transition-all hover:scale-[1.02]"
                            >
                              {opt}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {/* Yazıyor Baloncuğu */}
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

              {/* Klavye Giriş Alanı */}
              <form 
                onSubmit={handleCustomInputSubmit}
                className="bg-[#f0f0f0] p-2 flex items-center gap-2 z-10 border-t border-slate-200"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={chatStep === "welcome" || chatStep === "sector" || chatStep === "bottleneck" || chatStep === "captcha" || chatStep === "submitting" || chatStep === "success"}
                  placeholder={
                    chatStep === "welcome" || chatStep === "sector" || chatStep === "bottleneck"
                      ? "Cevabınızı yukarıdan seçin..."
                      : chatStep === "website"
                      ? "Web sitenizi yazın..."
                      : chatStep === "email"
                      ? "E-posta adresinizi yazın..."
                      : chatStep === "captcha"
                      ? "Güvenlik doğrulamasını tamamlayın..."
                      : "İşlem yapılıyor..."
                  }
                  className="flex-1 bg-white rounded-full h-8 px-3 text-[10px] text-slate-800 border border-slate-200 shadow-inner focus:outline-none focus:ring-1 focus:ring-[#075E54] disabled:bg-slate-100 disabled:text-slate-400"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all shadow-md ${
                    inputValue.trim() 
                      ? "bg-[#075E54] hover:scale-105 active:scale-95" 
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Başarı Durumunda Sıfırlama Butonu */}
              {chatStep === "success" && (
                <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white z-20">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4 max-w-[280px]"
                  >
                    <div className="inline-flex p-3 bg-green-500/20 text-green-400 rounded-full animate-bounce border border-green-500/30">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h3 className="text-base font-bold">Talep Alındı! 🎉</h3>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      İşletmenizin AI entegrasyon analiz raporunu hazırlamaya başladık.
                      En geç **24 saat içinde** size özel Loom video analizi **{formData.email}** adresinize gönderilecektir.
                    </p>
                    <button
                      onClick={resetChat}
                      className="btn-primary w-full flex items-center justify-center gap-2 mt-4 text-xs py-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Yeni Analiz Başlat
                    </button>
                  </motion.div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
