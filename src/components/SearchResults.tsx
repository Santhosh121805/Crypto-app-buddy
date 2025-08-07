import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock, MapPin, Star, Wifi, Coffee, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  type: 'flight' | 'hotel';
  title: string;
  subtitle: string;
  price: string;
  currency: string;
  rating?: number;
  duration?: string;
  departure?: string;
  arrival?: string;
  amenities?: string[];
  image?: string;
  cryptoPrice?: {
    btc?: string;
    eth?: string;
    usdc?: string;
  };
}

interface SearchResultsProps {
  isVisible?: boolean;
  onSelectResult?: (result: SearchResult) => void;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'flight',
    title: 'IndiGo 6E-456',
    subtitle: 'Bangalore (BLR) → Mumbai (BOM)',
    price: '₹4,250',
    currency: 'INR',
    rating: 4.2,
    duration: '1h 30m',
    departure: '08:30 AM',
    arrival: '10:00 AM',
    cryptoPrice: {
      btc: '0.00045 BTC',
      eth: '0.0142 ETH',
      usdc: '51.2 USDC'
    }
  },
  {
    id: '2',
    type: 'flight',
    title: 'SpiceJet SG-234',
    subtitle: 'Bangalore (BLR) → Mumbai (BOM)',
    price: '₹3,890',
    currency: 'INR',
    rating: 3.9,
    duration: '1h 35m',
    departure: '02:15 PM',
    arrival: '03:50 PM',
    cryptoPrice: {
      btc: '0.00041 BTC',
      eth: '0.0130 ETH',
      usdc: '46.8 USDC'
    }
  },
  {
    id: '3',
    type: 'hotel',
    title: 'The Oberoi Mumbai',
    subtitle: 'Nariman Point, Mumbai',
    price: '₹8,500',
    currency: 'INR',
    rating: 4.7,
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
    cryptoPrice: {
      btc: '0.00089 BTC',
      eth: '0.0284 ETH',
      usdc: '102.3 USDC'
    }
  }
];

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  isVisible = false, 
  onSelectResult 
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState<'btc' | 'eth' | 'usdc'>('usdc');

  if (!isVisible) return null;

  const handleSelect = (result: SearchResult) => {
    if (onSelectResult) {
      onSelectResult(result);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Search Results</h3>
        <div className="flex gap-2">
          <Button
            variant={selectedCrypto === 'usdc' ? 'crypto' : 'outline'}
            size="sm"
            onClick={() => setSelectedCrypto('usdc')}
          >
            USDC
          </Button>
          <Button
            variant={selectedCrypto === 'eth' ? 'crypto' : 'outline'}
            size="sm"
            onClick={() => setSelectedCrypto('eth')}
          >
            ETH
          </Button>
          <Button
            variant={selectedCrypto === 'btc' ? 'crypto' : 'outline'}
            size="sm"
            onClick={() => setSelectedCrypto('btc')}
          >
            BTC
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {mockResults.map((result) => (
          <Card 
            key={result.id} 
            className="p-4 hover:shadow-travel transition-smooth cursor-pointer bg-gradient-subtle"
            onClick={() => handleSelect(result)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  result.type === 'flight' 
                    ? 'bg-gradient-travel text-white' 
                    : 'bg-gradient-crypto text-white'
                )}>
                  {result.type === 'flight' ? <Plane size={20} /> : <MapPin size={20} />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{result.title}</h4>
                    {result.rating && (
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-warning fill-current" />
                        <span className="text-sm text-muted-foreground">{result.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{result.subtitle}</p>
                  
                  {result.type === 'flight' && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{result.duration}</span>
                      </div>
                      <span>{result.departure} - {result.arrival}</span>
                    </div>
                  )}
                  
                  {result.type === 'hotel' && result.amenities && (
                    <div className="flex gap-2 flex-wrap">
                      {result.amenities.slice(0, 3).map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-foreground mb-1">
                  {result.price}
                </div>
                {result.cryptoPrice && (
                  <div className="text-sm font-medium text-primary">
                    {result.cryptoPrice[selectedCrypto]}
                  </div>
                )}
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(result);
                  }}
                >
                  <CreditCard size={14} className="mr-1" />
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;