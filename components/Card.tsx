import React from "react";
export function Card({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  )
}
