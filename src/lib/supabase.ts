import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Eğer Supabase çevre değişkenleri eksikse çalışacak şık bir Mock/Fallback Katmanı (Graceful Degradation)
class SupabaseMockClient {
  from(table: string) {
    return {
      insert: async (data: any) => {
        console.warn(`[Supabase Mock] '${table}' tablosuna veri yazılmaya çalışıldı (Supabase anahtarları eksik):`, data);
        
        // Tarayıcı ortamındaysak veriyi localStorage üzerinde sakla (böylece test edilebilir kalır)
        if (typeof window !== "undefined") {
          try {
            const existing = localStorage.getItem(`mock_${table}`) || "[]";
            const parsed = JSON.parse(existing);
            parsed.push({ ...data, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() });
            localStorage.setItem(`mock_${table}`, JSON.stringify(parsed));
          } catch (e) {
            console.error("[Supabase Mock] LocalStorage yazma hatası:", e);
          }
        }
        return { data: [data], error: null };
      },
      select: async () => {
        if (typeof window !== "undefined") {
          const existing = localStorage.getItem(`mock_${table}`) || "[]";
          return { data: JSON.parse(existing), error: null };
        }
        return { data: [], error: null };
      }
    };
  }
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (new SupabaseMockClient() as any);
