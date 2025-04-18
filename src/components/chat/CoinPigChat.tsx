import React, { useState, useRef, useEffect } from 'react';
import { Send, Pi as Pig, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { chatWithCoinPig } from '../../services/gemini';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const CoinPigChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithCoinPig(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error chatting with CoinPig:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{
        height: isMinimized ? '60px' : '500px',
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 w-96 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 flex flex-col overflow-hidden"
    >
      <div 
        className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center">
          <Pig className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
          <h3 className="font-semibold text-lg">CoinPig Assistant</h3>
        </div>
        <Button variant="ghost" size="sm" className="p-1">
          {isMinimized ? (
            <Maximize2 className="w-4 h-4" />
          ) : (
            <Minimize2 className="w-4 h-4" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-4 ${
                      message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 dark:bg-neutral-700'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask CoinPig about crypto..."
                  disabled={isLoading}
                  fullWidth
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};