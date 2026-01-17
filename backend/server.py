from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timedelta
import jwt
import hashlib
import shutil
from services.email_service import email_service

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
