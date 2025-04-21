
import React from "react";
import { X, ChevronLeft } from "lucide-react";

type SubmenuItem = {
  label: string;
  path?: string;
};

interface MobileMenuSubpanelProps {
  open: boolean;
  menuLabel: string;
  items: SubmenuItem[];
  onClose: () => void;
  onBack: () => void;
}

const MobileMenuSubpanel: React.FC<MobileMenuSubpanelProps> = ({
  open,
  menuLabel,
  items,
  onClose,
  onBack,
}) => {
  // Slide-in/out using translate-x CSS and fade for overlay
  return (
    <div
      className={`
        fixed inset-0 z-[100000] bg-[#18181b] transition-all duration-300 
        ${open ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"}
        flex flex-col
      `}
      style={{
        backdropFilter: open ? "blur(2px)" : undefined,
      }}
      aria-hidden={!open}
    >
      {/* Header row with back/close */}
      <div className="flex items-center justify-between px-6 pt-7 pb-5">
        <button aria-label="Back" onClick={onBack}>
          <ChevronLeft size={32} className="text-zinc-300" />
        </button>
        <span className="text-lg font-medium text-zinc-200 truncate flex-1 text-center">{menuLabel}</span>
        <button aria-label="Close menu" onClick={onClose}>
          <X size={28} className="text-zinc-200" />
        </button>
      </div>
      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-5">
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.path || "#"}
                className="block text-2xl md:text-3xl font-medium text-white py-2 px-2 rounded hover:bg-zinc-800 transition-colors"
                style={{ wordBreak: "break-word" }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenuSubpanel;
