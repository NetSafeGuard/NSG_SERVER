import { EmailTemplate } from "../models/email.model";

export const recoveryTemplate = (email: string, token: string) => {
  const template = new EmailTemplate();
  template.subject = "Recuperação de senha";
  template.html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recuperação de Palavra-passe - NetSafeGuard</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        
            <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #333333; text-align: center;">Pedido de Recuperação de Palavra-passe</h1>
        
                <p style="color: #555555; text-align: center;">Olá, ${email}!</p>
        
                <p style="color: #555555; text-align: center;">Para redefinir sua senha, clique no link abaixo:</p>
        
                <p style="text-align: center;">
                    <a href="https://netsafeguard.cloud/recovery/${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Redefinir Palavra-passe</a>
                </p>
        
                <p style="color: #555555; text-align: center;">Se você não solicitou a recuperação de senha, por favor, ignore este email.</p>
        
                <p style="color: #555555; text-align: center;">Atenciosamente,</p>
                <p style="color: #007bff; text-align: center; font-weight: bold;">Equipe NetSafeGuard</p>
            </div>
        </body>
    </html>
    `;
  return template;
};
