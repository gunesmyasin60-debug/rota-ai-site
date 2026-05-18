"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Hatayı sunucu loglarına veya izleme servislerine raporlayabiliriz
    console.error("Global Error Caught by Boundary:", error);
  }, [error]);

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dekoratif Glow Efektleri */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full bg-white/80 border border-slate-200/80 rounded-3xl p-8 backdrop-blur-md shadow-2xl text-center relative z-10 animate-scaleUp">
        {/* Hata İkonu */}
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-100 shadow-sm">
          <AlertTriangle className="w-8 h-8 animate-pulse" />
        </div>

        {/* Hata Mesajı */}
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
          Teknik Bir Pürüz Oluştu 🛠️
        </h1>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8">
          Sistemimiz bu beklenmedik durumu otomatik olarak kaydetti ve teknik ekibimize iletti. 
          Endişelenmeyin, web sitemizin geri kalan özellikleri sapasağlam çalışıyor!
        </p>

        {/* Aksiyon Butonları */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 w-full bg-[var(--color-primary)] hover:bg-indigo-500 text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-900/10 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Sayfayı Yeniden Yükle
          </button>
          
          <a
            href="/"
            className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-2xl text-xs transition-all border border-slate-200 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-[10px] text-slate-400">
          ROTA-AI Akıllı Hata Yönetim Sistemi &bull; Referans: {error.digest || "GLB_ERR"}
        </div>
      </div>
    </div>
  );
}
