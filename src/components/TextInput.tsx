import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface TextInputProps {
  placeholder: string;
  onSubmit: (text: string) => void;
}

const TextInput = ({ placeholder, onSubmit }: TextInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-h-[80px] pr-16 text-lg border-2 border-border bg-card resize-none rounded-2xl focus:border-primary"
        aria-label="Type your symptoms"
      />
      <Button
        variant="default"
        size="icon"
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="absolute right-3 bottom-3 rounded-xl"
        aria-label="Send message"
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default TextInput;
