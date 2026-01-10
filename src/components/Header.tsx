import { Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onEmergencyClick: () => void;
}

const Header = ({ onEmergencyClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="container flex items-center justify-between">
        {/* App Name */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-foreground">
              Health Assistant
            </h1>
            <p className="text-xs text-muted-foreground">स्वास्थ्य सहायक</p>
          </div>
        </div>

        {/* Emergency Button */}
        <Button
          variant="emergency"
          size="lg"
          onClick={onEmergencyClick}
          className="gap-2"
        >
          <Phone className="w-5 h-5" />
          <span className="hidden sm:inline">Emergency</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
