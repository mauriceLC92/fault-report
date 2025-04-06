import { JSX } from 'react'
import { LucideIcon } from 'lucide-react';

interface IconInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder: string;
  label: string;
  Icon: LucideIcon;
}

const IconInput = ({
  type,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  label,
  Icon
}: IconInputProps): JSX.Element => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && '*'}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default IconInput;