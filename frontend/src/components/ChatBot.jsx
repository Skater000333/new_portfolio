import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { portfolioData, chatbotPrompts } from '../mock/mock';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
        text: chatbotPrompts.greeting,
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
    if (!messageText.trim()) return;

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

    // Simulate bot response (will be replaced with actual API call later)
    setTimeout(() => {
      const botResponse = generateMockResponse(messageText);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Mock response generator (will be replaced with actual OpenRouter API)
  const generateMockResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('ai') || input.includes('ml') || input.includes('machine learning')) {
      return `Parth has extensive experience in AI/ML! He's developed fraud detection systems with 90% accuracy improvement, NILM algorithms with 97%+ accuracy, and published research on AI-driven groundwater monitoring. His work spans pharma, defense, and government sectors.`;
    }
    
    if (input.includes('product') || input.includes('management') || input.includes('manager')) {
      return `As a Product Manager, Parth excels at leading cross-functional teams and delivering scalable solutions. He's managed budgets up to 5 Lakhs, coordinated with 10+ government bodies, and driven 50% increase in dashboard adoption across enterprise clients. His approach combines technical expertise with strategic thinking.`;
    }
    
    if (input.includes('project') || input.includes('experience')) {
      return `Parth's highlight projects include: AI fraud detection at PharmaSecure (90% faster detection), smart energy systems at CSIO (20% energy savings), and avalanche detection for DRDO (95% accuracy). Each project demonstrates his ability to solve complex technical challenges with real business impact.`;
    }
    
    if (input.includes('leadership') || input.includes('team')) {
      return `Parth is a natural leader - he's been State & District Roller Hockey Captain for 8+ years, led community education initiatives helping 60+ children, and managed cross-functional teams of 20+ members. His leadership style combines sports discipline with technical expertise.`;
    }
    
    if (input.includes('education') || input.includes('background')) {
      return `Parth holds a B.Tech in Computer Science from Punjab Engineering College and an Advanced Diploma in Statistics (Distinction) from Punjab University. He's also certified in Data Science, ML, and AWS from top institutions like IBM and Johns Hopkins.`;
    }

    // Default response
    return `That's a great question! Parth's background spans Product Management, AI/ML development, and technical leadership across pharma, government, and defense sectors. He's known for delivering measurable business impact through data-driven solutions. Would you like to know more about any specific area of his expertise?`;
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
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
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
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Try asking:</p>
                {chatbotPrompts.suggestions.map((suggestion, index) => (
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
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;