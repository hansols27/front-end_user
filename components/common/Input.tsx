import { InputHTMLAttributes } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  device: "pc" | "mo";
  isSearch?: boolean;
  className?: string;
}

export default function Input({
  device,
  isSearch = false,
  className = "",
  ...props
}: InputProps) {
  const sizeClass = `input-${device}`;

  return (
    <div className={`relative ${className}`}>
      {isSearch && (
        <SearchIcon className="input-search-icon" />
      )}

      <input
        className={`input-base input-style ${sizeClass} ${
          isSearch ? "input-search" : ""
        }`}
        {...props}
      />
    </div>
  );
}