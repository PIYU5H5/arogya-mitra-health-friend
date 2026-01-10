import { Home, History, HelpCircle } from "lucide-react";

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick: () => void;
}

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const navItems: NavItem[] = [
    {
      icon: Home,
      label: "Home",
      active: activeTab === "home",
      onClick: () => onTabChange("home"),
    },
    {
      icon: History,
      label: "History",
      active: activeTab === "history",
      onClick: () => onTabChange("history"),
    },
    {
      icon: HelpCircle,
      label: "Help",
      active: activeTab === "help",
      onClick: () => onTabChange("help"),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border pr-24">
      <div className="flex items-center justify-start gap-2 py-2 px-4">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all duration-200 touch-manipulation ${
              item.active
                ? "text-primary bg-secondary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
            aria-label={item.label}
            aria-current={item.active ? "page" : undefined}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
