import { useState } from "react";
import Header from "@/components/Header";
import LanguageSelector from "@/components/LanguageSelector";
import ElevenLabsWidget from "@/components/ElevenLabsWidget";
import ChatBox from "@/components/ChatBox";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("hi");
  const [activeTab, setActiveTab] = useState("home");
  const { toast } = useToast();

  const handleEmergencyClick = () => {
    toast({
      title: "Emergency Help",
      description: "Connecting to emergency helpline: 112",
      variant: "destructive",
    });
    window.location.href = "tel:112";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Navigation & Emergency Button */}
      <Header 
        onEmergencyClick={handleEmergencyClick} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-4 px-4 pb-24">
        {/* Language Selector */}
        <div className="mb-4">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        {/* Chat Box */}
        <ChatBox />
      </main>

      {/* ElevenLabs Widget - Bottom right default position */}
      <ElevenLabsWidget />
    </div>
  );
};

export default Index;
