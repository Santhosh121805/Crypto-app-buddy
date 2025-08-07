import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Wallet, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Shield,
  Copy,
  ExternalLink 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CryptoPaymentProps {
  isVisible?: boolean;
  bookingDetails?: {
    title: string;
    price: string;
    cryptoPrice: {
      btc?: string;
      eth?: string;
      usdc?: string;
    };
  };
  onPaymentComplete?: () => void;
}

const cryptoOptions = [
  {
    id: 'usdc',
    name: 'USDC',
    fullName: 'USD Coin',
    icon: '💰',
    network: 'Polygon',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    fees: 'Low fees (~$0.01)'
  },
  {
    id: 'eth',
    name: 'ETH',
    fullName: 'Ethereum',
    icon: '⟠',
    network: 'Ethereum',
    address: '0x742d35Cc6e1b4b4C3D5C8f9d9F9f5c5c5c5c5c5c',
    fees: 'Medium fees (~$15)'
  },
  {
    id: 'btc',
    name: 'BTC',
    fullName: 'Bitcoin',
    icon: '₿',
    network: 'Bitcoin',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    fees: 'Higher fees (~$25)'
  }
];

export const CryptoPayment: React.FC<CryptoPaymentProps> = ({
  isVisible = false,
  bookingDetails,
  onPaymentComplete
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState('usdc');
  const [paymentStep, setPaymentStep] = useState<'select' | 'pay' | 'confirming' | 'complete'>('select');
  const { toast } = useToast();

  if (!isVisible || !bookingDetails) return null;

  const selectedOption = cryptoOptions.find(opt => opt.id === selectedCrypto);
  const cryptoAmount = bookingDetails.cryptoPrice[selectedCrypto as keyof typeof bookingDetails.cryptoPrice];

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Copied!",
      description: "Wallet address copied to clipboard",
    });
  };

  const handleProceedToPayment = () => {
    setPaymentStep('pay');
  };

  const handleConfirmPayment = () => {
    setPaymentStep('confirming');
    
    // Simulate payment confirmation
    setTimeout(() => {
      setPaymentStep('complete');
      if (onPaymentComplete) {
        onPaymentComplete();
      }
    }, 3000);
  };

  const renderPaymentStep = () => {
    switch (paymentStep) {
      case 'select':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose Payment Method</h3>
            
            <div className="grid gap-3">
              {cryptoOptions.map((option) => (
                <Card
                  key={option.id}
                  className={cn(
                    "p-4 cursor-pointer transition-smooth hover:shadow-card",
                    selectedCrypto === option.id
                      ? "ring-2 ring-primary bg-gradient-subtle"
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => setSelectedCrypto(option.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <div className="font-semibold">{option.fullName}</div>
                        <div className="text-sm text-muted-foreground">{option.network}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{cryptoAmount}</div>
                      <div className="text-xs text-muted-foreground">{option.fees}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button 
              onClick={handleProceedToPayment}
              variant="hero"
              className="w-full"
            >
              Proceed to Payment
              <ArrowRight size={16} />
            </Button>
          </div>
        );

      case 'pay':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setPaymentStep('select')}
              >
                ← Back
              </Button>
              <h3 className="text-lg font-semibold">Send Payment</h3>
            </div>

            <Card className="p-4 bg-gradient-subtle">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{selectedOption?.icon}</span>
                <div>
                  <div className="font-semibold">{selectedOption?.fullName}</div>
                  <Badge variant="secondary">{selectedOption?.network}</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Amount to Send</label>
                  <div className="text-2xl font-bold text-primary">{cryptoAmount}</div>
                </div>

                <div>
                  <label className="text-sm font-medium">Recipient Address</label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 text-xs bg-muted p-2 rounded font-mono">
                      {selectedOption?.address}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyAddress(selectedOption?.address || '')}
                    >
                      <Copy size={12} />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield size={14} />
                  <span>Secure payment powered by blockchain technology</span>
                </div>
              </div>
            </Card>

            <Button 
              onClick={handleConfirmPayment}
              variant="success"
              className="w-full"
            >
              I've Sent the Payment
              <CheckCircle size={16} />
            </Button>
          </div>
        );

      case 'confirming':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-crypto rounded-full flex items-center justify-center">
              <Clock size={24} className="text-white animate-spin" />
            </div>
            <h3 className="text-lg font-semibold">Confirming Payment</h3>
            <p className="text-muted-foreground">
              We're verifying your payment on the blockchain. This usually takes 1-3 minutes.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" size="sm">
                <ExternalLink size={12} className="mr-1" />
                View on Explorer
              </Button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-travel rounded-full flex items-center justify-center">
              <CheckCircle size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-success">Payment Confirmed!</h3>
            <p className="text-muted-foreground">
              Your booking has been confirmed and you'll receive confirmation details shortly.
            </p>
          </div>
        );
    }
  };

  return (
    <Card className="p-6 shadow-travel">
      <div className="space-y-6">
        {/* Booking Summary */}
        <div>
          <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
          <Card className="p-4 bg-muted/50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-semibold">{bookingDetails.title}</div>
                <div className="text-sm text-muted-foreground">Travel Booking</div>
              </div>
              <div className="text-right">
                <div className="font-bold">{bookingDetails.price}</div>
                <div className="text-sm text-primary">{cryptoAmount}</div>
              </div>
            </div>
          </Card>
        </div>

        <Separator />

        {/* Payment Steps */}
        {renderPaymentStep()}
      </div>
    </Card>
  );
};

export default CryptoPayment;