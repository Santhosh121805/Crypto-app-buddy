import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatInterface from '@/components/ChatInterface';
import SearchResults from '@/components/SearchResults';
import CryptoPayment from '@/components/CryptoPayment';
import { 
  Bot, 
  Plane, 
  CreditCard, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  Star,
  Users,
  Clock
} from 'lucide-react';
import heroImage from '@/assets/hero-travel.jpg';

const Index = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const handleBookingRequest = (query: string) => {
    setShowSearch(true);
  };

  const handleSelectResult = (result: any) => {
    setSelectedBooking(result);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setShowSearch(false);
    setSelectedBooking(null);
  };

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI-Powered Booking",
      description: "Natural language travel requests with intelligent understanding"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Crypto Payments",
      description: "Pay with Bitcoin, Ethereum, USDC and other cryptocurrencies"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Transparent",
      description: "Blockchain-secured transactions with full transparency"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Booking",
      description: "Real-time search and instant confirmation across providers"
    }
  ];

  const stats = [
    { value: "10K+", label: "Bookings Completed", icon: <Plane className="w-5 h-5" /> },
    { value: "4.8", label: "User Rating", icon: <Star className="w-5 h-5" /> },
    { value: "50+", label: "Crypto Supported", icon: <CreditCard className="w-5 h-5" /> },
    { value: "24/7", label: "AI Assistant", icon: <Clock className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <Badge className="bg-white/20 text-white border-white/30 mb-6" variant="outline">
            <Globe className="w-4 h-4 mr-2" />
            The Future of Travel Booking
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            AI Travel Assistant
            <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Meets Crypto
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Book flights and hotels with natural language. Pay instantly with cryptocurrency. 
            Experience the future of travel booking today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Booking
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center shadow-card hover:shadow-travel transition-smooth">
                <div className="flex justify-center mb-3 text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience seamless travel booking powered by AI and secured by blockchain technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-travel transition-smooth group">
                <div className="bg-gradient-travel text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-smooth">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Interface Section */}
      <section id="chat" className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Try Our AI Assistant
            </h2>
            <p className="text-xl text-muted-foreground">
              Just tell us what you're looking for in plain English
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Chat Interface */}
            <div>
              <ChatInterface onBookingRequest={handleBookingRequest} />
            </div>
            
            {/* Search Results or Payment */}
            <div className="space-y-6">
              {showPayment ? (
                <CryptoPayment
                  isVisible={showPayment}
                  bookingDetails={selectedBooking}
                  onPaymentComplete={handlePaymentComplete}
                />
              ) : (
                <SearchResults
                  isVisible={showSearch}
                  onSelectResult={handleSelectResult}
                />
              )}
              
              {!showSearch && !showPayment && (
                <Card className="p-8 text-center shadow-card">
                  <div className="w-16 h-16 mx-auto bg-gradient-travel rounded-full flex items-center justify-center mb-4">
                    <Plane className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready to Book?</h3>
                  <p className="text-muted-foreground">
                    Search results and payment options will appear here once you start chatting with our AI assistant.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Revolutionize Your Travel?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of travelers who are already booking with crypto
          </p>
          <Button 
            variant="hero" 
            size="lg"
            className="text-lg px-12 py-4"
            onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;