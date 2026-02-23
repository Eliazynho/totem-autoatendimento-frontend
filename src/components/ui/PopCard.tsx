import React, { HTMLAttributes } from "react";

interface PopCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "white" | "yellow" | "red";
}

export function PopCard({
  children,
  variant = "white",
  className = "",
  ...props
}: PopCardProps) {
  const variants = {
    white: "bg-popWhite text-popBlack",
    yellow: "bg-popYellow text-popRed",
    red: "bg-popRed text-popYellow",
  };

  return (
    <div
      className={`
        border-[3px] border-popBlack rounded-2xl shadow-pop
        p-6 relative overflow-hidden backdrop-blur-sm
        ${variants[variant]} ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
