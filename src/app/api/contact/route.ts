// Debug: Triggering fresh deployment for Coolify
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
          if (!process.env.RESEND_API_KEY) {
                  console.error('RESEND_API_KEY is missing');
                  return NextResponse.json({ error: 'API Anahtari eksik. Vercel ayarlarini kontrol edin.' }, { status: 500 });
          }

      const { name, email, business, service, message } = await request.json();

      const { data, error } = await resend.emails.send({
              // NOT: Alan adi dogrulanmadiysa 'onboarding@resend.dev' kullanilmasi gerekebilir.
                                                             from: 'ROTA-AI <iletisim@rota-ai.com.tr>',
              to: ['muyagunesyasim@gmail.com'],
              subject: `Yeni Proje Talebi: ${name}`,
              replyTo: email,
              html: `
                      <h2>Yeni Bir Iletisim Formu Mesaji Geldi</h2>
                              <p><strong>Ad Soyad:</strong> ${name}</p>
                                      <p><strong>E-posta:</strong> ${email}</p>
                                              <p><strong>Isletme:</strong> ${business || 'Belirtilmedi'}</p>
                                                      <p><strong>Hizmet:</strong> ${service}</p>
                                                              <p><strong>Mesaj:</strong></p>
                                                                      <p>${message || 'Mesaj birakilmadi.'}</p>
                                                                            `,
      });


      if (error) {
              console.error('Resend Error:', error);
              return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true, data });
    } catch (error: any) {
          console.error('Submission Error:', error);
          return NextResponse.json({ error: 'Bir hata olustu: ' + error.message }, { status: 500 });
    }
}
