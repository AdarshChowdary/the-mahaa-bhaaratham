// lib/LLMContext.tsx
'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface LLMContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
}

const LLMContext = createContext<LLMContextType | undefined>(undefined);

// List of Mahaabhaaratam-related keywords for filtering
const mahaabhaaratamKeywords = [
  'mahabharata', 'pandavas', 'kauravas', 'krishna', 'arjuna', 'bhima', 'yudhishthira', 
  'nakula', 'sahadeva', 'draupadi', 'kunti', 'dhritarashtra', 'gandhari', 'bhishma', 'dronacharya', 
  'karna', 'duryodhana', 'hastinapura', 'indraprastha', 'kurukshetra', 'war', 'dharma', 
  'bhagavad', 'gita', 'vyasa', 'epic', 'warrior', 'kingdom', 'fifth veda', 'mahabharat', 
  'mahabharatham', 'mahaabhaaratham', 'uparichara', 'shantanu', 'satyavati', 'ganga', 'kuntibhoja', 
  'subhadra', 'kripi', 'vidura', 'vasu', 'vasudeva', 'vaasudeva', 'kamsa', 'jarasandha', 'kubera', 
  'sauti', 'saunaka', 'sanjaya', 'bhrigu', 'pauloma', 'janamejaya', 'parikshit', 'utanka',
  'garuda', 'aruna', 'kashyapa', 'aditi', 'diti', 'abhimaanyu', 'uttara', 'virata', 'shikhandi', 'amba',
  'ambika', 'ambalika', 'chitrangada', 'vichitravirya', 'babruvahana', 'iravan', 'ghatotkacha', 'hidimba', 
  'ulupi', 'chitrasena', 'shakuni', 'dushasana', 'dushala', 'jayadratha', 'kripacharya', 'ashwatthama', 
  'balarama', 'revati', 'rukmini', 'satyabhama', 'jambavati', 'nagnajiti', 'kalindi', 'mitravinda', 
  'bhadra', 'lakshmana', 'samba', 'pradyumna', 'aniruddha', 'puru', 'yadu', 'kuru', 
  'anu', 'kuru', 'panchala', 'shalya', 'shishupala', 'dantavakra', 'vidura', 
  'yuyutsu', 'kritavarma', 'satya', 'satyaki', 'dhrishtadyumna', 'shikhandi', 'pritha', 
  'madri', 'shakuntala', 'dushyanta', 'bharata', 'devavrata', 'devaki', 'nanda', 'yashoda', 
  'akrura', 'ugrasena', 'vrikasura', 'bakasura', 'putana', 'trinavarta', 'keshi', 'vyomasura', 
  'arishtha', 'chanura', 'mustika', 'kubja', 'sudama', 'sudeshna', 'susharma', 'somadatta', 
  'bhurishrava', 'valakhilya', 'satyavati', 'matsyagandha', 'yojanagandha', 'matsya', 'girika',
  'suktimati', 'adrika'
];

const isMahaabhaaratamRelated = (question: string): boolean => {
  const lowerQuestion = question.toLowerCase();
  return mahaabhaaratamKeywords.some(keyword => lowerQuestion.includes(keyword.toLowerCase()));
};

export function LLMProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (message: string) => {
    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { role: 'user', content: message }]);

      if (!isMahaabhaaratamRelated(message)) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I apologize, but I can only answer questions related to the Mahabharata. Please ask me about the great epic, its characters, events, or teachings."
        }]);
        return;
      }

      const prompt = `As an expert on the Mahabharata, please answer the following question about the epic: ${message}. 
                     Please ensure your answer is accurate to the epic and its teachings.`;

      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I encountered an error. Please try asking your question again."
      }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <LLMContext.Provider value={{ messages, isLoading, sendMessage }}>
      {children}
    </LLMContext.Provider>
  );
}

export function useLLM() {
  const context = useContext(LLMContext);
  if (undefined === context) {
    throw new Error('useLLM must be used within an LLMProvider');
  }
  return context;
}