"use client";

import { CalendarDays, Goal } from "lucide-react";
import type { ViewName } from "@/types";

interface BottomNavigationProps {
  activeView: ViewName;
  onNavigate: (view: ViewName) => void;
}

export function BottomNavigation({ activeView, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="bottom-navigation" aria-label="Mobil asosiy menyu">
      <button className={activeView === "fields" ? "bottom-nav-item active" : "bottom-nav-item"} onClick={() => onNavigate("fields")}>
        <Goal size={22} aria-hidden="true" /><span>Maydonlar</span>
      </button>
      <button className={activeView === "schedule" ? "bottom-nav-item active" : "bottom-nav-item"} onClick={() => onNavigate("schedule")}>
        <CalendarDays size={22} aria-hidden="true" /><span>Bo‘sh vaqtlar</span>
      </button>
    </nav>
  );
}