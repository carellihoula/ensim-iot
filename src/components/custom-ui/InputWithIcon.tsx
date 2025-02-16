import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { IconType } from "react-icons";

export interface InputWithIconProps extends ComponentPropsWithoutRef<"div"> {
  icon: LucideIcon | IconType;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon: Icon,
  type = "text",
  placeholder = "",
  value,
  onChange,
  ...props
}) => {
  return (
    <div className="relative w-full" {...props}>
      <Icon
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        size={20}
      />
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10"
      />
    </div>
  );
};

export default InputWithIcon;
