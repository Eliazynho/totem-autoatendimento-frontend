import React, { ButtonHTMLAttributes } from "react";

interface PopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "warning" | "neutral";
  fullWidth?: boolean;
}

export function PopButton({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: PopButtonProps) {
  const baseClasses = `
    flex items-center justify-center gap-2
    px-6 py-4 rounded-xl
    border-[3px] border-popBlack
    text-xl uppercase font-black font-nunito tracking-wider
    shadow-pop hover:shadow-pop-hover hover:-translate-y-1 hover:-translate-x-1
    active:shadow-pop-active active:translate-y-0 active:translate-x-0
    transition-all duration-100 ease-out select-none
  `;

  const variants = {
    primary: "bg-popRed text-popYellow",
    secondary: "bg-popYellow text-popRed",
    warning: "bg-orange-500 text-white",
    neutral: "bg-popWhite text-popBlack",
  };

  const widthClass = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
