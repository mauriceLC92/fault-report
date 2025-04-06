import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
}

const ActionButton = ({
  onClick,
  icon: Icon,
  label,
  primary = false,
  secondary = false,
  tertiary = false,
}: ActionButtonProps): JSX.Element => {
  const getButtonClass = () => {
    if (primary) {
      return "bg-blue-600 hover:bg-blue-700 text-white";
    } else if (secondary) {
      return "bg-gray-100 hover:bg-gray-200 text-gray-800";
    } else if (tertiary) {
      return "bg-blue-50 hover:bg-blue-100 text-blue-700";
    } else if (label.includes("WhatsApp")) {
      return "bg-green-600 hover:bg-green-700 text-white";
    }
    return "bg-gray-100 hover:bg-gray-200 text-gray-800";
  };

  return (
    <button
      onClick={onClick}
      className={`${getButtonClass()} font-semibold py-3 px-4 rounded-lg shadow flex items-center justify-center w-full transition-all`}
    >
      <Icon className="mr-2 h-5 w-5" />
      {label}
    </button>
  );
};

export default ActionButton;