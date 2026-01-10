import { Search, MapPin, FolderHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onCheckSymptoms: () => void;
  onFindHospital: () => void;
  onViewHistory: () => void;
}

const ActionButtons = ({
  onCheckSymptoms,
  onFindHospital,
  onViewHistory,
}: ActionButtonsProps) => {
  const actions = [
    {
      icon: Search,
      label: "Check Symptoms",
      sublabel: "लक्षण जांचें",
      onClick: onCheckSymptoms,
      color: "text-primary",
    },
    {
      icon: MapPin,
      label: "Find Hospital",
      sublabel: "अस्पताल खोजें",
      onClick: onFindHospital,
      color: "text-accent",
    },
    {
      icon: FolderHeart,
      label: "My Health History",
      sublabel: "मेरा स्वास्थ्य इतिहास",
      onClick: onViewHistory,
      color: "text-success",
    },
  ];

  return (
    <div className="grid gap-4">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="action"
          size="xl"
          onClick={action.onClick}
          className="w-full justify-start"
        >
          <div className={`p-3 rounded-xl bg-secondary ${action.color}`}>
            <action.icon className="w-7 h-7" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg font-semibold">{action.label}</span>
            <span className="text-sm text-muted-foreground">{action.sublabel}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;
