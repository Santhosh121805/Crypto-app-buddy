import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Plane, User, Wallet, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, walletAddress, signOut, connectWallet, disconnectWallet } = useAuth();

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Plane className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg bg-gradient-elegant bg-clip-text text-transparent">
            CryptoTravel
          </span>
        </Link>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Wallet Status */}
              {walletAddress ? (
                <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
                  <Wallet className="h-3 w-3" />
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </Badge>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={connectWallet}
                  className="hidden sm:flex items-center gap-1"
                >
                  <Wallet className="h-3 w-3" />
                  Connect Wallet
                </Button>
              )}

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  
                  {/* Mobile wallet toggle */}
                  <div className="sm:hidden">
                    {walletAddress ? (
                      <DropdownMenuItem onClick={disconnectWallet}>
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Disconnect Wallet</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={connectWallet}>
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Connect Wallet</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                  </div>

                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;