'use client';

import { SelectHTMLAttributes, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  device: 'pc' | 'mo';
  options: { value: string; label: string }[];
}

export default function Select({
  label,
  device,
  options,
  className = '',
  onChange,
  ...props
}: SelectProps) {
  const sizeClass = `select-${device}`;
  const variantClass = label ? 'select-labeled' : '';

  const [open, setOpen] = useState(false);

  return (
    <div className={`select-wrapper ${className}`}>
      {label && <span className="select-inner-label">{label}</span>}

        <select
          className={`select-base select-style ${variantClass} ${sizeClass}`}
          onMouseDown={() => {
            setOpen(true);
          }}
          onBlur={() => {
            setOpen(false);
          }}
          onChange={(e) => {
            setOpen(false);
            onChange?.(e);
          }}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* 화살표 */}
        <KeyboardArrowDownIcon
          className={`select-arrow pointer-events-none
            transition-transform duration-300
            ${open ? 'rotate-180' : 'rotate-0'}
          `}
        />
      
    </div>
  );
}