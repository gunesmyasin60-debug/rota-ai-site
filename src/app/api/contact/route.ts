// Debug: Triggering fresh deployment for Coolify
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing');
      return NextResponse.json({ error: 'API Anahtarı eksik. Vercel ayarlarını kontrol edin.' }, { status: 500 });
    }

    const { name, email, business, service, message } = await request.json();

    const { data, error } = await resend.emails.send({
      // NOT: Alan adı doğrulanmadıysa 'onboarding@resend.dev' kullanılması gerekebilir.
      from: 'ROTA-AI <onboarding@resend.dev>', 
      to: ['muyagunesyasim@gmail.com'],
      subject: `Yeni Proje Talebi: ${name}`,
      replyTo: email,
      html: `
        <h2>Yeni Bir İletişim Formu Mesajı Geldi</h2>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>İşletme:</strong> ${business || 'Belirtilmedi'}</p>
        <p><strong>Hizmet:</strong> ${service}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message || 'Mesaj bırakılmadı.'}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
