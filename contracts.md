# Portfolio Backend Integration Contracts

## API Endpoints

### Chat Endpoint
**Endpoint**: `POST /api/chat`

**Purpose**: Handle chatbot conversations using OpenRouter's meta-llama/llama-3-8b-instruct model

**Request Body**:
```json
{
  "message": "string",
  "conversation_history": [
    {
      "role": "user|assistant",
      "content": "string"
    }
  ]
}
```

**Response**:
```json
{
  "response": "string",
  "status": "success|error",
  "error": "string (optional)"
}
```

## Frontend-Backend Integration

### Chatbot Component Changes
- Replace mock response generation in `handleSendMessage()` function
- Call `/api/chat` endpoint with user message and conversation history
- Handle loading states and error responses
- Maintain conversation context for better responses

### Environment Variables Required
- `OPENROUTER_API_KEY`: OpenRouter API key for authentication
- `OPENROUTER_MODEL`: Model name (meta-llama/llama-3-8b-instruct)

## System Prompt for AI Assistant
The AI assistant should be configured with knowledge about Parth Khungar:
- Professional background in Product Management, AI/ML, IoT
- Current role: Associate Product Manager at PharmaSecure
- Key achievements: 90% reduction in counterfeit detection, 97% NILM accuracy
- Leadership: Roller hockey captain, community educator
- Education: B.Tech CS, Advanced Diploma Statistics
- Interests: AI/ML research, sports, social impact

## Security Considerations
- API key stored securely in backend environment
- Rate limiting on chat endpoint
- Input validation and sanitization
- Error handling without exposing sensitive information

## Mock Data Removal
After backend integration:
- Remove mock response logic from ChatBot.jsx
- Update to call real API endpoint
- Maintain existing UI/UX flow