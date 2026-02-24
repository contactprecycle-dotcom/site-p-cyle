from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List
import uuid
from datetime import datetime
from services.resend_email_service import resend_email_service

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
if not mongo_url:
    logger.error("MONGO_URL not found in environment variables")
    raise ValueError("MONGO_URL is required")

client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'precycle_db')]

# Create the main app without a prefix
app = FastAPI(title="Precycle API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Nom de famille")
    firstName: str = Field(..., min_length=2, max_length=100, description="Prénom")
    email: EmailStr = Field(..., description="Adresse email valide")
    phone: str = Field(..., min_length=10, max_length=20, description="Numéro de téléphone")
    city: str = Field(..., min_length=2, max_length=100, description="Ville")
    message: str = Field(..., min_length=10, max_length=2000, description="Message")

class ContactResponse(BaseModel):
    success: bool
    message: str
    email_id: str = None

# Routes
@api_router.get("/")
async def root():
    return {"message": "Precycle API is running", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "precycle-backend"
    }

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact: ContactForm):
    """Handle contact form submission and send email"""
    try:
        logger.info(f"Received contact form submission from {contact.firstName} {contact.name} ({contact.email})")
        
        # Validate and clean input data
        contact_data = {
            "name": contact.name.strip(),
            "firstName": contact.firstName.strip(),
            "email": contact.email.lower().strip(),
            "phone": contact.phone.strip(),
            "city": contact.city.strip(),
            "message": contact.message.strip()
        }
        
        # Send email using Resend service
        email_result = await resend_email_service.send_contact_email(
            name=contact_data["name"],
            firstName=contact_data["firstName"],
            email=contact_data["email"],
            phone=contact_data["phone"],
            city=contact_data["city"],
            message=contact_data["message"]
        )
        
        if not email_result.get("success"):
            logger.error(f"Email sending failed: {email_result.get('error')}")
            raise HTTPException(
                status_code=500,
                detail="Erreur lors de l'envoi de l'email. Veuillez réessayer plus tard."
            )
        
        # Store in database for tracking
        contact_record = {
            **contact_data,
            "timestamp": datetime.utcnow(),
            "status": "sent",
            "email_id": email_result.get("email_id"),
            "service": email_result.get("service")
        }
        
        try:
            await db.contact_messages.insert_one(contact_record)
            logger.info(f"Contact message saved to database for {contact.email}")
        except Exception as db_error:
            logger.warning(f"Database save failed but email was sent: {str(db_error)}")
            # Don't fail the request if only database save fails
        
        return ContactResponse(
            success=True,
            message="Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
            email_id=email_result.get("email_id")
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Erreur interne du serveur. Veuillez réessayer plus tard."
            }
        )

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # In production, specify your domain
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Precycle backend starting up...")
    logger.info("Checking email service configuration...")
    
    # Verify email service configuration
    try:
        resend_api_key = os.environ.get('RESEND_API_KEY')
        if resend_api_key:
            logger.info("✅ Resend API key found")
        else:
            logger.warning("⚠️ RESEND_API_KEY not configured")
    except Exception as e:
        logger.error(f"❌ Email service configuration error: {str(e)}")

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("Shutting down Precycle backend...")
    client.close()

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    firstName: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    city: str = Field(..., min_length=2, max_length=100)
    message: str = Field(..., min_length=10, max_length=1000)

class ContactResponse(BaseModel):
    success: bool
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact: ContactForm):
    """Handle contact form submission and send email"""
    try:
        # Validate input (Pydantic already does basic validation)
        
        # Send email
        email_sent = await email_service.send_contact_email(
            name=contact.name,
            firstName=contact.firstName,
            email=contact.email,
            phone=contact.phone,
            city=contact.city,
            message=contact.message
        )
        
        if not email_sent:
            raise HTTPException(
                status_code=500, 
                detail="Erreur lors de l'envoi de l'email. Veuillez réessayer plus tard."
            )
        
        # Store in database (optional - for tracking)
        contact_record = {
            "name": contact.name,
            "firstName": contact.firstName,
            "email": contact.email,
            "phone": contact.phone,
            "city": contact.city,
            "message": contact.message,
            "timestamp": datetime.utcnow(),
            "status": "sent"
        }
        
        await db.contact_messages.insert_one(contact_record)
        
        return ContactResponse(
            success=True,
            message="Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais."
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Contact form error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Erreur interne du serveur. Veuillez réessayer plus tard."
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
