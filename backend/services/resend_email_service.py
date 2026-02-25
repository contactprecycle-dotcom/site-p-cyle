import resend
import os
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)

class ResendEmailService:
    def __init__(self):
        self._initialized = False
        self.api_key = None
        self.from_email = None
        self.to_email = None

    def _ensure_initialized(self):
        """Lazy initialization to allow dotenv to load first"""
        if self._initialized:
            return
        
        self.api_key = os.environ.get('RESEND_API_KEY')
        if not self.api_key:
            logger.error("RESEND_API_KEY not found in environment variables")
            raise ValueError("RESEND_API_KEY is required")
        
        resend.api_key = self.api_key
        self.from_email = os.environ.get('FROM_EMAIL', 'onboarding@resend.dev')
        self.to_email = os.environ.get('TO_EMAIL', 'contact.precycle@gmail.com')
        self._initialized = True
        logger.info("ResendEmailService initialized successfully")

    async def send_contact_email(
        self, 
        name: str, 
        firstName: str, 
        email: str, 
        phone: str, 
        city: str, 
        message: str
    ) -> Dict[str, Any]:
        """Send contact form email using Resend"""
        try:
            # Ensure service is initialized
            self._ensure_initialized()
            
            # Create professional HTML email
            html_content = self._create_html_template(name, firstName, email, phone, city, message)
            
            # Send email via Resend
            email_response = resend.Emails.send({
                "from": f"Precycle Contact <{self.from_email}>",
                "to": [self.to_email],
                "subject": f"Nouveau message de contact - {firstName} {name}",
                "html": html_content,
                "reply_to": email,
                "tags": [
                    {"name": "category", "value": "contact-form"}
                ]
            })
            
            logger.info(f"Email sent successfully via Resend. ID: {email_response.get('id')}")
            
            return {
                "success": True,
                "message": "Email envoyé avec succès !",
                "email_id": email_response.get('id'),
                "service": "resend"
            }
            
        except Exception as e:
            logger.error(f"Failed to send email via Resend: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "service": "resend"
            }

    def _create_html_template(
        self, 
        name: str, 
        firstName: str, 
        email: str, 
        phone: str, 
        city: str, 
        message: str
    ) -> str:
        """Create professional HTML email template"""
        return f"""
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau message de contact - Precycle</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #dc2626, #ef4444); padding: 30px 20px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">
                        🚴‍♂️ PRECYCLE
                    </h1>
                    <p style="color: #fee2e2; margin: 10px 0 0 0; font-size: 16px;">
                        Nouveau message de contact
                    </p>
                </div>

                <!-- Content -->
                <div style="padding: 30px 20px;">
                    <h2 style="color: #dc2626; margin-top: 0; font-size: 22px; border-bottom: 2px solid #fee2e2; padding-bottom: 10px;">
                        📋 Détails du contact
                    </h2>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #dc2626;">
                        <div style="display: grid; gap: 12px;">
                            <div>
                                <strong style="color: #374151;">👤 Nom complet :</strong> 
                                <span style="color: #1f2937;">{firstName} {name}</span>
                            </div>
                            <div>
                                <strong style="color: #374151;">📧 Email :</strong> 
                                <a href="mailto:{email}" style="color: #dc2626; text-decoration: none;">{email}</a>
                            </div>
                            <div>
                                <strong style="color: #374151;">📞 Téléphone :</strong> 
                                <a href="tel:{phone}" style="color: #dc2626; text-decoration: none;">{phone}</a>
                            </div>
                            <div>
                                <strong style="color: #374151;">🏙️ Ville :</strong> 
                                <span style="color: #1f2937;">{city}</span>
                            </div>
                        </div>
                    </div>
                    
                    <h3 style="color: #dc2626; margin-top: 25px; font-size: 18px;">💬 Message :</h3>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626;">
                        <p style="margin: 0; color: #374151; line-height: 1.7; font-size: 15px;">
                            {message.replace(chr(10), '<br>')}
                        </p>
                    </div>
                    
                    <!-- Call to Action -->
                    <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #fef2f2, #fee2e2); border-radius: 8px; text-align: center;">
                        <p style="margin: 0 0 15px 0; color: #991b1b; font-weight: 600;">
                            📧 Répondre directement au client :
                        </p>
                        <a href="mailto:{email}?subject=Re: Votre demande chez Precycle" 
                           style="display: inline-block; background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.3);">
                            ✉️ Répondre maintenant
                        </a>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">
                        📅 Reçu le {self._get_current_datetime()}<br>
                        🔧 Message envoyé depuis le site web Precycle
                    </p>
                </div>
            </div>
            
            <!-- Footer note -->
            <div style="text-align: center; margin-top: 20px;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                    Cet email a été envoyé automatiquement depuis le formulaire de contact de precycle.fr
                </p>
            </div>
        </body>
        </html>
        """

    def _get_current_datetime(self) -> str:
        """Get current datetime formatted for France timezone"""
        from datetime import datetime
        import pytz
        
        try:
            # Get current time in France timezone
            france_tz = pytz.timezone('Europe/Paris')
            now = datetime.now(france_tz)
            return now.strftime("%d/%m/%Y à %H:%M")
        except:
            # Fallback to UTC if pytz fails
            from datetime import datetime
            return datetime.now().strftime("%d/%m/%Y à %H:%M")

# Global email service instance
resend_email_service = ResendEmailService()