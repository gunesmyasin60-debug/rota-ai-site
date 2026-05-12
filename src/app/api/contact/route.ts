import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, business, service, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'ROTA-AI <iletisim@rota-ai.com.tr>',
      to: ['muyagunesyasim@gmail.com'],
      subject: `Yeni Proje Talebi: ${name}`,
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
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
