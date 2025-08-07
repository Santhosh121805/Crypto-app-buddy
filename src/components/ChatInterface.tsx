import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Plane, MapPin, Calendar, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    searchResults?: any[];
    bookingDetails?: any;
  };
}

interface ChatInterfaceProps {
  onBookingRequest?: (query: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBookingRequest }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI travel assistant. I can help you book flights and hotels with crypto payments. Try asking me something like: 'Book me a flight from Bangalore to Mumbai this weekend under ₹5,000 and pay with USDC'",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I understand you're looking for a flight booking! Let me search for the best options for you. I'll find flights that match your criteria and show you crypto payment options.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      // Trigger booking search
      if (onBookingRequest) {
        onBookingRequest(userMessage.content);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-96 flex flex-col bg-gradient-subtle shadow-card">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3",
              message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              message.type === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-gradient-hero text-white'
            )}>
              {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={cn(
              "max-w-[80%] rounded-lg p-3",
              message.type === 'user'
                ? 'bg-primary text-primary-foreground ml-4'
                : 'bg-card border shadow-card mr-4'
            )}>
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-hero text-white flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-card border shadow-card rounded-lg p-3 mr-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me to book your next trip..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            variant="hero"
            size="icon"
          >
            <Send size={16} />
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("Book me a flight from Bangalore to Mumbai this weekend under ₹5,000")}
            className="text-xs"
          >
            <Plane size={12} className="mr-1" />
            Quick Flight
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("Find me a hotel in Goa for 2 nights under ₹3,000")}
            className="text-xs"
          >
            <MapPin size={12} className="mr-1" />
            Hotel Search
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput("Show crypto payment options")}
            className="text-xs"
          >
            <CreditCard size={12} className="mr-1" />
            Crypto Pay
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;