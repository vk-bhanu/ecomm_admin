"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const colorMap: { [key: string]: string } = {
  red: 'bg-red-100 text-red-600',
  green: 'bg-green-100 text-green-600',
  blue: 'bg-blue-100 text-blue-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  black: 'bg-gray-300 text-black-600', 
  pink: 'bg-pink-100 text-pink-600',
  purple: 'bg-purple-100 text-purple-600',
  white: 'bg-grey-50 text-black-600',
  orange: 'bg-orange-100 text-orange-600',
  // Add more colors as needed
};

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    if (item && !value.includes(item)) {
      onChange(item);
      setInputValue("");
    }
  };

  const badgeClass = colorMap[inputValue.toLowerCase()] || 'bg-blue-100 text-blue-600';

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />

      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge key={index} className={colorMap[item] || 'bg-blue-100 text-blue-600'}>
            <button className="p-0 text-grey-1 mr-1 hover:text-red-1" onClick={() => onRemove(item)}>
              <X className="h-4 w-4" />
            </button>
            {item}
          </Badge>
        ))}

        {/* Add a badge for the current input value */}
        {inputValue && (
          <Badge className={badgeClass}>
            {inputValue}
          </Badge>
        )}
      </div>
    </>
  );
};

export default MultiText;
