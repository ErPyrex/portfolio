import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Simple validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    // HTML Email Template (Option B: Dark Console Style)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nuevo Mensaje de Portafolio</title>
          <style>
            body {
              background-color: #030303;
              color: #d4d4d8;
              font-family: 'Courier New', Courier, monospace;
              padding: 20px;
              margin: 0;
            }
            .console-box {
              background-color: #09090b;
              border: 1px solid #27272a;
              border-radius: 8px;
              padding: 20px;
              max-width: 600px;
              margin: 0 auto;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            }
            .console-header {
              border-bottom: 1px solid #18181b;
              padding-bottom: 12px;
              margin-bottom: 16px;
              display: block;
            }
            .console-dots-container {
              display: inline-block;
            }
            .console-dot {
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              margin-right: 6px;
            }
            .dot-red { background-color: #ef4444; }
            .dot-yellow { background-color: #f59e0b; }
            .dot-green { background-color: #10b981; }
            .console-title {
              display: inline-block;
              color: #71717a;
              font-size: 11px;
              margin-left: 10px;
              letter-spacing: 0.05em;
              vertical-align: middle;
            }
            .prompt {
              color: #6366f1;
              font-weight: bold;
            }
            .accent {
              color: #10b981;
            }
            .string-val {
              color: #a5b4fc;
            }
            .code-block {
              background-color: #040405;
              border-left: 3px solid #6366f1;
              padding: 12px;
              margin: 10px 0;
              border-radius: 0 4px 4px 0;
              white-space: pre-wrap;
              color: #e4e4e7;
            }
            .meta {
              font-size: 10px;
              color: #52525b;
              margin-top: 20px;
              border-top: 1px solid #18181b;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="console-box">
            <div class="console-header">
              <div class="console-dots-container">
                <div class="console-dot dot-red"></div>
                <div class="console-dot dot-yellow"></div>
                <div class="console-dot dot-green"></div>
              </div>
              <div class="console-title">portfolio_message_listener.sh</div>
            </div>
            
            <p><span class="prompt">pyrex64@linux:~$</span> ./show-message.sh</p>
            
            <p><span class="accent">✔ Connection established. Incoming transmission received:</span></p>
            
            <div style="margin-left: 10px; line-height: 1.6;">
              <span class="prompt">const</span> remitente = {<br>
              &nbsp;&nbsp;nombre: <span class="string-val">"${name}"</span>,<br>
              &nbsp;&nbsp;correo: <span class="string-val">"${email}"</span><br>
              };<br><br>
              
              <span class="prompt">const</span> mensaje = <span class="string-val">"</span>
              <div class="code-block">${message}</div>
              <span class="string-val">"</span>;
            </div>
            
            <p><span class="prompt">pyrex64@linux:~$</span> <span class="accent">echo "Processing success..."</span></p>
            <p style="color: #10b981; font-size: 11px;">[SUCCESS] Message successfully delivered to Sergio Rodriguez.</p>
            
            <div class="meta">
              // Timestamp: ${new Date().toISOString()}<br>
              // Next.js Serverless Route: /api/contact
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["sergioalarcon22986@gmail.com"],
      subject: `📧 Mensaje de ${name} vía Portafolio`,
      html: htmlContent,
      replyTo: email,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Resend API Error:", err);
    return NextResponse.json(
      { error: err.message || "Error interno al enviar el correo." },
      { status: 500 }
    );
  }
}
