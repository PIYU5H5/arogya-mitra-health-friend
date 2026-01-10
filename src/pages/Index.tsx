import { useState } from "react";
import Header from "@/components/Header";
import LanguageSelector from "@/components/LanguageSelector";
import VoiceInput from "@/components/VoiceInput";
import TextInput from "@/components/TextInput";
import ActionButtons from "@/components/ActionButtons";
import BottomNav from "@/components/BottomNav";
import ElevenLabsWidget from "@/components/ElevenLabsWidget";
import { useToast } from "@/hooks/use-toast";

const placeholders: Record<string, string> = {
  hi: "अपने लक्षण यहां लिखें...",
  mr: "तुमची लक्षणे येथे लिहा...",
  ta: "உங்கள் அறிகுறிகளை இங்கே எழுதுங்கள்...",
  te: "మీ లక్షణాలను ఇక్కడ రాయండి...",
  kn: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...",
  ml: "നിങ്ങളുടെ ലക്ഷണങ്ങൾ ഇവിടെ എഴുതുക...",
  bn: "এখানে আপনার লক্ষণ লিখুন...",
  gu: "તમારા લક્ષણો અહીં લખો...",
  en: "Type your symptoms here...",
};

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const { toast } = useToast();

  const handleEmergencyClick = () => {
    // In production, this would trigger a phone call
    toast({
      title: "Emergency Help",
      description: "Connecting to emergency helpline: 112",
      variant: "destructive",
    });
    // Attempt to open phone dialer
    window.location.href = "tel:112";
  };

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Assistant Active",
        description: "Speak clearly about your symptoms",
      });
    }
  };

  const handleTextSubmit = (text: string) => {
    toast({
      title: "Analyzing symptoms...",
      description: text.substring(0, 50) + (text.length > 50 ? "..." : ""),
    });
    // In production, this would send to AI for analysis
  };

  const handleCheckSymptoms = () => {
    toast({
      title: "Symptom Checker",
      description: "Opening symptom checker...",
    });
  };

  const handleFindHospital = () => {
    toast({
      title: "Finding Nearby Hospitals",
      description: "Locating healthcare facilities near you...",
    });
  };

  const handleViewHistory = () => {
    toast({
      title: "Health History",
      description: "Loading your health records...",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header with Emergency Button */}
      <Header onEmergencyClick={handleEmergencyClick} />

      {/* Main Content */}
      <main className="container py-6 space-y-8 animate-fade-in">
        {/* Language Selector */}
        <section className="flex justify-center">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </section>

        {/* Voice Input Section */}
        <section className="bg-card rounded-3xl p-6 shadow-sm border border-border">
          <VoiceInput
            isListening={isListening}
            onVoiceClick={handleVoiceClick}
          />

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground px-2">
              or type below
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Text Input */}
          <TextInput
            placeholder={placeholders[selectedLanguage] || placeholders.en}
            onSubmit={handleTextSubmit}
          />
        </section>

        {/* Action Buttons */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground px-1">
            Quick Actions
          </h2>
          <ActionButtons
            onCheckSymptoms={handleCheckSymptoms}
            onFindHospital={handleFindHospital}
            onViewHistory={handleViewHistory}
          />
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ElevenLabs Conversational AI Widget */}
      <ElevenLabsWidget />
    </div>
  );
};

export default Index;
