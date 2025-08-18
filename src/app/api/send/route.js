// src/app/api/send/route.js

import { Resend } from 'resend';

// .env dosyasından API anahtarımızı alıyoruz
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // Formdan gelen verileri ayrıştırıyoruz
    const { name, email, subject, message } = await request.json();

    // E-postayı gönderiyoruz
    const { data, error } = await resend.emails.send({
      from: 'İletişim Formu <form@barbarosaydin.com>', // Bu e-postanın alan adınızla aynı olması GEREKİR
      to: ['contact@barbarosaydin.com'], // E-postanın geleceği adres
      subject: `Yeni Form Mesajı: ${subject}`,
      reply_to: email, // E-postayı yanıtladığınızda doğrudan kullanıcıya gitmesini sağlar
      // E-postanın içeriğini HTML olarak tasarlıyoruz
      html: `
        <h1>Yeni Bir İletişim Formu Mesajı Aldınız</h1>
        <p><strong>Gönderen:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Konu:</strong> ${subject}</p>
        <hr>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    // Başarılı olursa, bir onay mesajı döndürüyoruz
    return Response.json({ message: 'Mesaj başarıyla gönderildi!' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}