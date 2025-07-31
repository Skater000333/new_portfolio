from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime
import uuid

class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[ChatMessage]] = Field(default_factory=list)
    session_id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()))

class ChatResponse(BaseModel):
    response: str
    status: Literal["success", "error"]
    error: Optional[str] = None
    session_id: str
    
class OpenRouterRequest(BaseModel):
    model: str
    messages: List[dict]
    max_tokens: Optional[int] = 1000
    temperature: Optional[float] = 0.7