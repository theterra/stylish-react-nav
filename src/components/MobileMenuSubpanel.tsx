
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
  hideCloseButton?: boolean; // Add this prop to optionally hide the close button
}

const MobileMenuSubpanel: React.FC<MobileMenuSubpanelProps> = ({
  open,
  menuLabel,
  items,
  onClose,
  onBack,
  hideCloseButton = false, // Default to false
}) => {
  // Fade in/out animation instead of slide
  return (
    <div
      className={`
        fixed inset-0 z-[100000] bg-[#18181b] transition-all duration-300 
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        flex flex-col
      `}
      aria-hidden={!open}
    >
      {/* Header row with back/close */}
      <div className="flex items-center justify-between px-6 pt-7 pb-5">
        <button aria-label="Back" onClick={onBack}>
          <ChevronLeft size={32} className="text-zinc-300" />
        </button>
        <span className="text-lg font-medium text-zinc-200 truncate flex-1 text-center">{menuLabel}</span>
        {!hideCloseButton && (
          <button aria-label="Close menu" onClick={onClose}>
            <X size={28} className="text-zinc-200" />
          </button>
        )}
        {hideCloseButton && <div className="w-7"></div>} {/* Empty div for spacing when button is hidden */}
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
