import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceInputProps {
  isListening: boolean;
  onVoiceClick: () => void;
}

const VoiceInput = ({ isListening, onVoiceClick }: VoiceInputProps) => {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Voice Button */}
      <Button
        variant="voice"
        size="iconXl"
        onClick={onVoiceClick}
        className={`relative ${isListening ? "voice-pulse" : ""}`}
        aria-label={isListening ? "Stop listening" : "Start voice input"}
      >
        <Mic className="w-12 h-12" />
        
        {/* Listening indicator */}
        {isListening && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <span className="w-1.5 h-4 bg-primary-foreground rounded-full listening-wave" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-4 bg-primary-foreground rounded-full listening-wave" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-4 bg-primary-foreground rounded-full listening-wave" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </Button>

      {/* Instructions */}
      <div className="text-center space-y-2">
        <p className="text-xl font-semibold text-foreground">
          {isListening ? "Listening..." : "Tap to speak"}
        </p>
        <p className="text-base text-muted-foreground">
          {isListening ? "सुन रहा हूं..." : "बोलने के लिए टैप करें"}
        </p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Tell me how you feel in your language
        </p>
      </div>
    </div>
  );
};

export default VoiceInput;
