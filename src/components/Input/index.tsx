import React from "react";

interface Props {
  value: string;
  name: string;
  onChange: (value: string, name: string) => void;
  placeholder?: string;
  type?: string;
  fullwidth?: boolean;
  invalid?: boolean;
}

export function Input(props: Props) {
  const invalidClasses = props.invalid ? "border-2 border-red-400" : "";
  const fullwidthClasses = props.fullwidth ? "min-w-full" : "";
  return (
    <input
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
      className={`${invalidClasses} ${fullwidthClasses} pl-2 pt-1 pb-1 rounded focus:outline-none focus:bg-white focus:shadow-outline focus:border-green-400 `}
      onChange={(e) => props.onChange(e.target.value, props.name)}
    />
  );
}
