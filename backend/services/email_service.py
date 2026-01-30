import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.environ.get('SMTP_HOST')
        self.smtp_port = int(os.environ.get('SMTP_PORT', 587))
        self.smtp_user = os.environ.get('SMTP_USER')
        self.smtp_password = os.environ.get('SMTP_PASSWORD')
        self.email_from = os.environ.get('EMAIL_FROM')
        self.email_to = os.environ.get('EMAIL_TO')
    
    async def send_contact_email(self, name: str, firstName: str, email: str, phone: str, city: str, message: str) -> bool:
        """Send contact form email to Precycle"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'Nouveau message de contact - {firstName} {name}'
            msg['From'] = self.email_from
            msg['To'] = self.email_to
            
            # Create HTML content
            html_content = f"""
            <html>
                <head></head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #dc2626, #ef4444); padding: 20px; border-radius: 8px 8px 0 0;">
                            <h1 style="color: white; margin: 0; font-size: 24px;">🚴‍♂️ PRECYCLE</h1>
                            <p style="color: #fee2e2; margin: 5px 0 0 0;">Nouveau message de contact</p>
                        </div>
                        
                        <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #ddd;">
                            <h2 style="color: #dc2626; margin-top: 0;">Détails du contact</h2>
                            
                            <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
                                <p><strong>👤 Nom :</strong> {name}</p>
                                <p><strong>📧 Email :</strong> {email}</p>
                                <p><strong>📞 Téléphone :</strong> {phone}</p>
                                <p><strong>🏙️ Ville :</strong> {city}</p>
                            </div>
                            
                            <div style="background: white; padding: 15px; border-radius: 6px;">
                                <h3 style="color: #dc2626; margin-top: 0;">💬 Message :</h3>
                                <p style="background: #f8f9fa; padding: 10px; border-left: 3px solid #dc2626; margin: 0;">
                                    {message.replace(chr(10), '<br>')}
                                </p>
                            </div>
                            
                            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
                                <p>📅 Reçu le : {self._get_current_datetime()}</p>
                                <p>🔗 Vous pouvez répondre directement à : <a href="mailto:{email}" style="color: #dc2626;">{email}</a></p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            # Create plain text version
            text_content = f"""
PRECYCLE - Nouveau message de contact

Détails du contact :
- Nom : {name}
- Email : {email}
- Téléphone : {phone}
- Ville : {city}

Message :
{message}

Reçu le : {self._get_current_datetime()}
Vous pouvez répondre directement à : {email}
            """
            
            # Attach parts
            text_part = MIMEText(text_content, 'plain', 'utf-8')
            html_part = MIMEText(html_content, 'html', 'utf-8')
            
            msg.attach(text_part)
            msg.attach(html_part)
            
            # Send email
            await aiosmtplib.send(
                msg,
                hostname=self.smtp_host,
                port=self.smtp_port,
                username=self.smtp_user,
                password=self.smtp_password,
                use_tls=True
            )
            
            logger.info(f"Contact email sent successfully from {email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send contact email: {str(e)}")
            return False
    
    def _get_current_datetime(self) -> str:
        """Get current datetime formatted for France timezone"""
        from datetime import datetime
        import pytz
        
        # Get current time in France timezone
        france_tz = pytz.timezone('Europe/Paris')
        now = datetime.now(france_tz)
        return now.strftime("%d/%m/%Y à %H:%M")

# Global email service instance
email_service = EmailService()