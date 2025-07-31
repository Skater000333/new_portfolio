import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { portfolioData } from '../mock/mock';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with greeting when opened for first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = {
        id: Date.now(),
        text: "Hi! I'm Parth's AI assistant. I can help you learn more about his experience in Product Management, AI/ML projects, and leadership journey. What would you like to know?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare conversation history for API
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
        timestamp: msg.timestamp
      }));

      // Call the backend API
      const response = await axios.post(`${API}/chat`, {
        message: messageText,
        conversation_history: conversationHistory,
        session_id: sessionId
      });

      if (response.data.status === 'success') {
        const botMessage = {
          id: Date.now() + 1,
          text: response.data.response,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Handle API error response
        const errorMessage = {
          id: Date.now() + 1,
          text: response.data.response || "Sorry, I'm having trouble right now. Please try again!",
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat API error:', error);
      
      // Handle different types of errors
      let errorText = "I'm experiencing some technical difficulties. Please try again in a moment! 🤖";
      
      if (error.response?.status === 429) {
        errorText = "I'm getting a lot of questions right now! Please wait a moment and try again. ⏰";
      } else if (error.response?.status >= 500) {
        errorText = "I'm having server issues right now. Please try again shortly! 🔧";
      } else if (error.code === 'NETWORK_ERROR') {
        errorText = "I'm having trouble connecting. Please check your internet connection and try again! 📡";
      }

      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestions = [
    "Tell me about Parth's AI/ML projects",
    "What makes Parth unique as a Product Manager?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center z-50"
          aria-label="Open chat"
        >
          <img 
            src={portfolioData.personal.avatarUrl}
            alt="Chat Assistant"
            className="w-8 h-8 rounded-full"
          />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={portfolioData.personal.avatarUrl}
                alt="Assistant"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h3 className="text-sm font-medium text-black">Parth's Assistant</h3>
                <p className="text-xs text-gray-500">AI-powered helper</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-1 hover:bg-gray-200 rounded-md transition-colors duration-200"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                    message.sender === 'user'
                      ? 'bg-black text-white ml-4'
                      : 'bg-gray-100 text-gray-800 mr-4'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Suggested Questions (only show initially) */}
            {messages.length === 1 && !isLoading && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Try asking:</p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200 text-gray-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg mr-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Parth's experience..."
                className="flex-1 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                disabled={isLoading}
                maxLength={1000}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Powered by AI • Session: {sessionId.slice(0, 6)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;