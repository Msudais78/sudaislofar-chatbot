import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Plus, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle message sending with AI
  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userInput = currentMessage;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Call AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry yaar, kuch technical problem ho gayi. Thoda der baad try karo!',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Create Ninja SVG Logo component
  const NinjaLogo = ({ size = 48, className = "text-blue-400" }: { size?: number; className?: string }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="20" fill="currentColor" opacity="0.1"/>
      <path 
        d="M24 8c-8.84 0-16 7.16-16 16s7.16 16 16 16 16-7.16 16-16S32.84 8 24 8zm-6 20c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" 
        fill="currentColor"
      />
      <path 
        d="M20 18c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm12 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z" 
        fill="currentColor"
      />
      <path 
        d="M24 32c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4z" 
        fill="currentColor" 
        opacity="0.6"
      />
    </svg>
  );

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Left Sidebar */}
      <div className="w-64 flex flex-col" style={{ backgroundColor: '#202123' }}>
        {/* New Chat Button */}
        <div className="p-3">
          <Button 
            className="w-full flex items-center justify-center space-x-2 bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 transition-colors duration-200 rounded-lg py-3"
          >
            <Plus size={16} />
            <span>New Chat</span>
          </Button>
        </div>
        
        {/* Chat History */}
        <div className="flex-1 px-3 pb-3">
          <div className="text-gray-400 text-xs font-medium mb-3 px-3">CHAT HISTORY</div>
          <div className="space-y-2">
            {['Previous conversation 1', 'Previous conversation 2', 'Previous conversation 3'].map((item, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-150"
              >
                <MessageSquare size={14} />
                <span className="text-sm truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          /* Beautiful Header for Empty Chat */
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <NinjaLogo />
                <h1 className="text-4xl font-bold text-white ml-4">Sudaislofar</h1>
              </div>
              <p className="text-gray-400 text-lg mb-8">
                Your intelligent Hinglish AI companion
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-white font-medium mb-2">💬 Natural Conversations</h3>
                  <p className="text-gray-400 text-sm">Chat in Hindi, English, or Hinglish - I understand it all</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-white font-medium mb-2">🎯 Smart Assistance</h3>
                  <p className="text-gray-400 text-sm">Get help with questions, creative writing, and problem-solving</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-white font-medium mb-2">✨ Rich Responses</h3>
                  <p className="text-gray-400 text-sm">Beautifully formatted answers with headings, lists, and styling</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Messages Container */
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex items-start space-x-4 animate-fade-in ${
                    message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser 
                      ? 'bg-blue-600' 
                      : 'bg-gray-700 border border-gray-600'
                  }`}>
                    {message.isUser ? (
                      <span className="text-white text-sm font-medium">You</span>
                    ) : (
                      <NinjaLogo size={24} className="text-blue-400" />
                    )}
                  </div>
                  <div className={`max-w-3xl ${
                    message.isUser ? 'text-right' : ''
                  }`}>
                    <div className={`inline-block px-6 py-4 rounded-2xl ${
                      message.isUser 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-gray-100 border border-gray-700'
                    }`}>
                      <div 
                        dangerouslySetInnerHTML={{ __html: message.content }}
                        className="chat-content"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-700 border border-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <NinjaLogo size={24} className="text-blue-400" />
                  </div>
                  <div className="bg-gray-800 border border-gray-700 text-gray-300 px-6 py-4 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dots"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dots-delay-1"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dots-delay-2"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-700 bg-gray-900">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <Textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Message Sudaislofar... (Press Enter to send, Shift+Enter for new line)"
                  className="min-h-[44px] max-h-32 resize-none bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 pr-12"
                  rows={1}
                />
              </div>
              <Button 
                onClick={sendMessage}
                disabled={!currentMessage.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors duration-200 glow-on-hover"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
