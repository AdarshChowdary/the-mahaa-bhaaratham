// components/MahaabhaaratamChat.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useLLM } from '@/lib/LLMContext';
import { Send } from 'lucide-react';
import { scrollbarStyles, colors } from '@/utils/Scrollbar-styles';

export default function MahaabhaaratamChat() {
  const { messages, isLoading, sendMessage } = useLLM();
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage(input);
    setInput('');
  };

  return (
    <>
      {/* Inject custom scrollbar styles */}
      <style>{scrollbarStyles}</style>

      <div className="fixed bottom-4 right-4 z-50">
        {/* Chat Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            backgroundColor: colors.deepPurple,
            border: `1px solid ${colors.glassBorder}`,
            backdropFilter: 'blur(10px)'
          }}
          className="text-white p-4 shadow-lg mb-2 ml-auto block hover:bg-opacity-80 transition-all duration-200 cursor-pointer"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>

        {/* Chat Window */}
        {isOpen && (
          <div 
            style={{ 
              background: `linear-gradient(135deg, ${colors.deepPurple}, ${colors.cosmicBlue})`,
              border: `1px solid ${colors.glassBorder}`,
              backdropFilter: 'blur(10px)'
            }} 
            className="shadow-xl w-full md:w-96 h-[80vh] md:h-[500px] flex flex-col"
          >
            {/* Chat Header */}
            <div 
              style={{ 
                backgroundColor: colors.deepPurple,
                borderBottom: `1px solid ${colors.glassBorder}`
              }}
              className="text-white p-4 rounded-t-lg"
            >
              <h3 className="text-lg font-semibold">Mahabharata Guide</h3>
              <p className="text-sm opacity-80">Please be aware that chatbot responses may not always be accurate.</p>
            </div>

            {/* Messages with custom scrollbar */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    style={{ 
                      backgroundColor: message.role === 'user' ? colors.deepPurple : colors.cosmicBlue,
                      color: colors.textWhite,
                      border: `1px solid ${colors.glassBorder}`,
                      backdropFilter: 'blur(10px)'
                    }}
                    className="max-w-[80%] p-3 shadow-xs text-justify font-extralight"
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div 
                    style={{ 
                      backgroundColor: colors.cosmicBlue,
                      color: colors.textWhite,
                      border: `1px solid ${colors.glassBorder}`,
                      backdropFilter: 'blur(10px)'
                    }}
                    className="p-3 shadow-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <span>Thinking</span>
                      <span className="animate-pulse">...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleSubmit} 
              className="p-4 border-t" 
              style={{ borderColor: colors.glassBorder }}
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about the Mahabharata..."
                  style={{ 
                    border: `1px solid ${colors.glassBorder}`,
                    backgroundColor: colors.glassWhite,
                    color: colors.textWhite,
                    backdropFilter: 'blur(10px)'
                  }}
                  className="flex-1 p-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500 custom-scrollbar"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{ 
                    backgroundColor: colors.deepPurple,
                    border: `1px solid ${colors.glassBorder}`,
                    backdropFilter: 'blur(10px)'
                  }}
                  className="text-white p-2 hover:bg-opacity-80 disabled:opacity-50 transition-all duration-200 cursor-pointer"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}