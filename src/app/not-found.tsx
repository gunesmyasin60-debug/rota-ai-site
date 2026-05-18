import React from "react";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dekoratif Glow Efektleri */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full bg-white/80 border border-slate-200/80 rounded-3xl p-8 backdrop-blur-md shadow-2xl text-center relative z-10 animate-scaleUp">
        {/* 404 İkonu */}
        <div className="w-16 h-16 bg-indigo-50 text-[var(--color-primary)] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-100 shadow-sm">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        {/* 404 İçerik */}
        <span className="text-[10px] text-[var(--color-primary)] font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
          HATA KODU: 404
        </span>
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mt-4 mb-3">
          Aradığınız Rota Bulunamadı 🗺️
        </h1>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8">
          Ulaşmaya çalıştığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı bırakılmış olabilir. 
          Endişelenmeyin, doğru rotaya dönmek çok kolay!
        </p>

        {/* Aksiyon Butonu */}
        <a
          href="/"
          className="flex items-center justify-center gap-2 w-full bg-[var(--color-primary)] hover:bg-indigo-500 text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-lg shadow-indigo-900/10 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Geri Dön
        </a>

        <div className="mt-8 pt-6 border-t border-slate-100 text-[10px] text-slate-400">
          ROTA-AI Akıllı Yönlendirme Sistemi &bull; © 2026 Tüm Hakları Saklıdır.
        </div>
      </div>
    </div>
  );
}
