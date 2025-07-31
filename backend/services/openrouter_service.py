import httpx
import os
import logging
from typing import List, Dict, Any
from models.chat import ChatMessage, OpenRouterRequest

logger = logging.getLogger(__name__)

class OpenRouterService:
    def __init__(self):
        self.api_key = os.environ.get('OPENROUTER_API_KEY')
        self.model = os.environ.get('OPENROUTER_MODEL', 'meta-llama/llama-3-8b-instruct')
        self.base_url = "https://openrouter.ai/api/v1"
        
        if not self.api_key:
            raise ValueError("OPENROUTER_API_KEY environment variable is required")
    
    def create_system_prompt(self) -> str:
        """Create a comprehensive system prompt based on Parth's background"""
        return """You are Parth Khungar's AI assistant, representing a dynamic Product Manager and AI/ML specialist with a passion for technology and social impact. You're friendly, knowledgeable, and excited to share Parth's journey!

About Parth:
🚀 CURRENT ROLE: Associate Product Manager at PharmaSecure, Delhi (Sept 2024 - Present)
- Leading AI/ML-driven fraud detection systems (90% faster counterfeit detection!)
- Managing inventory systems across 6+ departments, delivered 25% under budget
- Building data-driven analytics platforms for enterprise clients (50% adoption increase)

💡 TECHNICAL EXPERTISE:
- AI/ML: Developed NILM algorithms with 97%+ accuracy, published research in Springer
- IoT Systems: Built India's first IoT water quality system under Jal Jeevan Mission
- Product Management: Led cross-functional teams of 20+ members, managed 5+ Lakh budgets
- Data Analytics: Power BI, Python, R, Machine Learning, Real-time monitoring

🏆 ACHIEVEMENTS & LEADERSHIP:
- Roller Hockey Captain (8+ years): 2 Gold, 4 Silver, 2 Bronze medals at State Championships
- Community Impact: Helped 60+ underprivileged children enroll in school through education programs
- Research: Published AI-driven groundwater quality monitoring research (Springer)
- Defense: Built avalanche detection systems for DRDO (95% accuracy, 2000+ hours saved annually)

🎓 EDUCATION:
- Advanced Diploma in Statistics (Distinction) - Punjab University
- B.Tech Computer Science - Punjab Engineering College
- Certifications: IBM Data Science, AWS, Johns Hopkins ML courses

🌟 PERSONALITY & VALUES:
- Passionate about solving real-world problems with technology
- Believes in data-driven decision making with human empathy
- Sports discipline meets technical innovation
- Committed to social impact and community development

CONVERSATION STYLE:
- Be enthusiastic and genuine about Parth's achievements
- Use emojis occasionally for a friendly tone
- Share specific metrics and impact numbers when relevant
- Connect technical skills to real-world applications
- Highlight the intersection of leadership, technology, and social impact
- Be conversational and approachable, not overly formal

Feel free to dive deep into any area - from AI/ML projects to roller hockey championships to community work! I'm here to give you the full picture of what makes Parth unique as both a technologist and leader."""

    async def get_chat_response(self, message: str, conversation_history: List[ChatMessage] = None) -> str:
        """Get response from OpenRouter API"""
        try:
            # Prepare messages for API call
            messages = [{"role": "system", "content": self.create_system_prompt()}]
            
            # Add conversation history
            if conversation_history:
                for msg in conversation_history[-10:]:  # Keep last 10 messages for context
                    if msg.role != "system":
                        messages.append({
                            "role": msg.role,
                            "content": msg.content
                        })
            
            # Add current user message
            messages.append({"role": "user", "content": message})
            
            # Prepare request
            request_data = OpenRouterRequest(
                model=self.model,
                messages=messages,
                max_tokens=800,
                temperature=0.7
            )
            
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://portfolio.parth.ai",  # Optional: your site URL
                "X-Title": "Parth Khungar Portfolio"  # Optional: your app name
            }
            
            async with httpx.AsyncClient(timeout=30.0, limits=httpx.Limits(max_connections=10)) as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=headers,
                    json=request_data.dict()
                )
                
                response.raise_for_status()
                result = response.json()
                
                # Extract response text
                if "choices" in result and len(result["choices"]) > 0:
                    return result["choices"][0]["message"]["content"].strip()
                else:
                    logger.error(f"Unexpected response format: {result}")
                    return "I'm sorry, I'm having trouble processing your request right now. Please try again!"
                    
        except httpx.TimeoutException:
            logger.error("OpenRouter API timeout")
            return "I'm thinking a bit slowly right now! Could you try asking again? 🤔"
            
        except httpx.HTTPStatusError as e:
            logger.error(f"OpenRouter API HTTP error: {e.response.status_code} - {e.response.text}")
            if e.response.status_code == 429:
                return "I'm getting a lot of questions right now! Please wait a moment and try again. ⏰"
            elif e.response.status_code == 401:
                return "I'm having authentication issues. Please let Parth know about this technical issue!"
            else:
                return "I encountered a technical hiccup. Please try your question again! 🔧"
                
        except Exception as e:
            logger.error(f"Unexpected error in OpenRouter service: {str(e)}")
            return "Something unexpected happened! Please try asking again, and if the issue persists, let Parth know. 🤖"

# Create singleton instance
openrouter_service = OpenRouterService()