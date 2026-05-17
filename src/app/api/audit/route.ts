import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { sector, bottleneck, website, email, turnstileToken } = await request.json();

    // 1. Girdilerin Validasyonu
    if (!email || !turnstileToken) {
      return NextResponse.json(
        { error: "Lütfen e-posta adresini ve güvenlik doğrulamasını tamamlayın." },
        { status: 400 }
      );
    }

    // 2. Cloudflare Turnstile Güvenlik Doğrulaması (Sıfır maliyetli bot koruması)
    let TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
    if (!TURNSTILE_SECRET_KEY || TURNSTILE_SECRET_KEY.includes("your_") || TURNSTILE_SECRET_KEY === "") {
      TURNSTILE_SECRET_KEY = "1x0000000000000000000000000000000AA"; // Test/Fallback Key (Must end in AA to match the 'Always Passes' test sitekey)
    }
    
    try {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(turnstileToken)}`,
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        console.error("Turnstile Verification Failed:", verifyData);
        return NextResponse.json(
          { error: "Güvenlik doğrulaması başarısız oldu (Bot Şüphesi)." },
          { status: 400 }
        );
      }
    } catch (turnstileErr) {
      console.error("Turnstile Network Error:", turnstileErr);
      // Ağ hatası durumunda kullanıcıyı engellememek adına loglayıp devam ediyoruz (Graceful Degradation)
    }

    // 3. Supabase Veri Kaydı (Graceful fallback ile)
    const { data: dbData, error: dbError } = await supabase
      .from("leads")
      .insert({
        sector,
        bottleneck,
        website: website || "Belirtilmedi",
        email,
      });

    if (dbError) {
      console.error("Supabase Save Error:", dbError);
      // DB hatası durumunda işlemi tamamen iptal etmiyoruz, e-posta bildirimine devam ediyoruz
    }

    // 4. Resend E-posta Yönetici Bildirimi
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const emailHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">🎥 Yeni Bir Dijital Röntgen Talebi Geldi</h2>
          <p style="font-size: 15px; color: #1e293b;">Rota-AI internet sitenizden yeni bir ücretsiz 5 dakikalık Loom video analiz talebi iletildi. Detaylar aşağıdadır:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569; width: 35%;">E-posta:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">
                <a href="mailto:${email}" style="color: #6366f1; text-decoration: none; font-weight: 600;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Web Sitesi:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">
                ${
                  website 
                    ? `<a href="${website}" target="_blank" style="color: #6366f1; text-decoration: none;">${website}</a>` 
                    : '<span style="color: #94a3b8; font-style: italic;">Belirtilmedi</span>'
                }
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Sektör:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500;">${sector || "Belirtilmedi"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569; vertical-align: top;">En Büyük Darboğaz:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155; line-height: 1.5;">${bottleneck || "Belirtilmedi"}</td>
            </tr>
          </table>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1; margin-top: 20px;">
            <p style="margin: 0; font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">SSCE Aksiyon Tavsiyesi:</p>
            <p style="margin: 5px 0 0 0; font-size: 13.5px; color: #334155; line-height: 1.4;">
              Müşteriye 24 saat içinde dönüş yapmak dönüşüm oranını %380 artırır. Hemen bir Loom videosu çekerek 
              <strong>${email}</strong> adresine iletmek üzere hazırlanın!
            </p>
          </div>
        </div>
      `;

      const { data, error } = await resend.emails.send({
        from: "ROTA-AI <iletisim@rota-ai.com.tr>",
        to: ["muyagunesyasin@gmail.com"],
        subject: `🎥 Rota-AI Dijital Röntgen Talebi: ${email}`,
        replyTo: email,
        html: emailHtml,
      });

      if (error) {
        console.error("Resend Email Sending Error:", error);
      }
    } else {
      console.warn(
        "[Resend Warning] RESEND_API_KEY bulunamadı, e-posta gönderimi simüle ediliyor. Detay:",
        { sector, bottleneck, website, email }
      );
    }

    return NextResponse.json({ success: true, dbSaved: !dbError });
  } catch (error) {
    console.error("API Error in Röntgen route:", error);
    return NextResponse.json(
      { error: "Sistemde teknik bir arıza oluştu. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}
