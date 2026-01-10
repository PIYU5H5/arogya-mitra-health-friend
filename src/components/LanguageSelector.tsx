import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "en", name: "English", nativeName: "English" },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector = ({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) => {
  const currentLang = languages.find((l) => l.code === selectedLanguage);

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-muted-foreground" />
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-auto min-w-[140px] h-12 text-base border-2 border-border bg-card">
          <SelectValue>
            {currentLang && (
              <span className="flex items-center gap-2">
                <span className="font-medium">{currentLang.nativeName}</span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-card border-2 border-border">
          {languages.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              className="text-base py-3 cursor-pointer"
            >
              <span className="flex flex-col">
                <span className="font-medium">{lang.nativeName}</span>
                <span className="text-sm text-muted-foreground">{lang.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
