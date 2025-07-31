from fastapi import APIRouter, HTTPException, Depends
from models.chat import ChatRequest, ChatResponse, ChatMessage
from services.openrouter_service import get_openrouter_service
import logging
from typing import List

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Handle chat requests and return AI-generated responses about Parth Khungar
    """
    try:
        logger.info(f"Received chat request: {request.message[:100]}...")
        
        # Validate input
        if not request.message or not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        if len(request.message) > 1000:
            raise HTTPException(status_code=400, detail="Message too long. Please keep it under 1000 characters.")
        
        # Get response from OpenRouter
        openrouter_service = get_openrouter_service()
        response_text = await openrouter_service.get_chat_response(
            message=request.message.strip(),
            conversation_history=request.conversation_history or []
        )
        
        logger.info(f"Generated response: {response_text[:100]}...")
        
        return ChatResponse(
            response=response_text,
            status="success",
            session_id=request.session_id
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return ChatResponse(
            response="I'm experiencing some technical difficulties right now. Please try again in a moment! 🤖",
            status="error",
            error="Internal server error",
            session_id=request.session_id
        )

@router.get("/chat/health")
async def chat_health():
    """Health check endpoint for chat service"""
    try:
        # Basic check to ensure OpenRouter service is configured
        openrouter_service = get_openrouter_service()
        has_api_key = bool(openrouter_service.api_key)
        return {
            "status": "healthy",
            "service": "chat",
            "openrouter_configured": has_api_key,
            "model": openrouter_service.model
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Chat service unavailable")