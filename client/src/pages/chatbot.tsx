import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Salaam! Main Sudaislofar hoon. Chalo gupshup karte hain! Jo bhi poochna hai, main answer kar dunga. Aaj kya haal chaal hai?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
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

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#1a1a1a' }}>
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 p-6 hidden lg:block">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">Sudaislofar</h2>
              <p className="text-gray-400 text-sm">AI Powered Hinglish Assistant</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Features</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Answer any question</li>
              <li>• Write poetry & stories</li>
              <li>• Solve math problems</li>
              <li>• General assistance</li>
              <li>• Friendly Hinglish chat</li>
            </ul>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Tips</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Ask in Hindi or English</li>
              <li>• Be specific for better answers</li>
              <li>• Try creative requests</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center lg:hidden">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-semibold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">Sudaislofar</h1>
            <p className="text-blue-100 text-sm">Aapka dost chatbot</p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full" style={{ backgroundColor: '#2c2c2c' }}>
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex items-start space-x-3 animate-fade-in ${
                  message.isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isUser ? 'bg-blue-600' : 'bg-gray-600'
                }`}>
                  <span className="text-white text-sm font-medium">
                    {message.isUser ? 'You' : 'S'}
                  </span>
                </div>
                <div className={`px-4 py-3 rounded-2xl max-w-2xl leading-relaxed ${
                  message.isUser 
                    ? 'bg-blue-600 text-white rounded-tr-md' 
                    : 'bg-gray-600 text-gray-100 rounded-tl-md'
                }`}>
                  <div 
                    dangerouslySetInnerHTML={{ __html: message.content }}
                    className="chat-content"
                  />
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">S</span>
                </div>
                <div className="bg-gray-600 text-gray-300 px-4 py-3 rounded-2xl rounded-tl-md">
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

          {/* Input Area */}
          <div className="p-6 border-t border-gray-700">
            <div className="flex space-x-3">
              <Input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Kuch bhi pucho, main yahan hoon..."
                className="flex-1 bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400"
                maxLength={500}
              />
              <Button 
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium transition-colors duration-200"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
