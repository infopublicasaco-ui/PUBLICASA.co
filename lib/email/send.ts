import nodemailer from "nodemailer";

// Configurar transporte de correo
// Para desarrollo, usar SMTP del hosting (cPanel)
// En producción, usar las credenciales del hosting real
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true para 465, false para otros puertos
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Si no hay configuración de SMTP, loguear y retornar true (no fallar)
    if (!process.env.SMTP_HOST) {
      console.log("📧 [DEV MODE] Email no configurado. Simulando envío:", {
        to: options.to,
        subject: options.subject,
      });
      return true;
    }

    const result = await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@publicasa.co",
      ...options,
    });

    console.log("✅ Email enviado:", result.messageId);
    return true;
  } catch (error) {
    console.error("❌ Error enviando email:", error);
    // No lanzar error para que el lead se guarde aunque falle el email
    return false;
  }
}

export function getContactEmailHtml(
  nombreContacto: string,
  emailContacto: string,
  telefonoContacto: string,
  mensajeContacto: string,
  tituloPropiedad: string,
  idPropiedad: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px; }
          .content { margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px; }
          .footer { color: #666; font-size: 12px; margin-top: 20px; }
          .button { background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📩 Nuevo contacto en tu propiedad</h1>
            <p>PUBLICASA.co</p>
          </div>
          
          <div class="content">
            <h2>${tituloPropiedad}</h2>
            
            <h3>Información del interesado:</h3>
            <p><strong>Nombre:</strong> ${nombreContacto}</p>
            <p><strong>Email:</strong> <a href="mailto:${emailContacto}">${emailContacto}</a></p>
            <p><strong>Teléfono:</strong> <a href="tel:${telefonoContacto}">+57 ${telefonoContacto}</a></p>
            
            <h3>Mensaje:</h3>
            <p>${mensajeContacto}</p>
            
            <p>
              <a href="https://publicasa.co/perfil#contactos" class="button">Ver en tu panel</a>
            </p>
          </div>
          
          <div class="footer">
            <p>Este es un mensaje automático de PUBLICASA.co. Por favor no respondas a este correo.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function getConfirmationEmailHtml(
  nombreUsuario: string,
  tituloPropiedad: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; border-radius: 8px; }
          .content { margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px; }
          .footer { color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ ¡Solicitud enviada!</h1>
            <p>PUBLICASA.co</p>
          </div>
          
          <div class="content">
            <p>Hola ${nombreUsuario},</p>
            
            <p>Tu solicitud de contacto para la propiedad <strong>${tituloPropiedad}</strong> ha sido enviada exitosamente.</p>
            
            <p>El propietario ha recibido tu información y se comunicará contigo pronto a través del email o teléfono que proporcionaste.</p>
            
            <p>Gracias por usar <strong>PUBLICASA.co</strong> 🏠</p>
          </div>
          
          <div class="footer">
            <p>Este es un mensaje automático de PUBLICASA.co. Por favor no respondas a este correo.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
