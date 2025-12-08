"use client";
import { ReactNode } from "react";

export default function PazzaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      {children}
    </div>
  );
}