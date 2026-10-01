"use client";

import { Headset, Menu, X } from "lucide-react";
import { useState } from "react";
import type { ViewName } from "@/types";

interface HeaderProps {
  activeView: ViewName;
  onNavigate: (view: ViewName) => void;
}

export function Header({ activeView, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (view: ViewName) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => navigate("fields")} aria-label="MiniFutbol bosh sahifasi">
          <span className="brand-ball" aria-hidden="true">⚽</span>
          <span>mini<span className="brand-accent">futbol</span></span>
        </button>
        <nav className="desktop-nav" aria-label="Asosiy menyu">
          <button className={activeView === "fields" ? "nav-link active" : "nav-link"} onClick={() => navigate("fields")}>Maydonlar</button>
          <button className={activeView === "schedule" ? "nav-link active" : "nav-link"} onClick={() => navigate("schedule")}>Bo‘sh vaqtlar</button>
        </nav>
        <a className="help-link" href="tel:+998712000000">
          <span className="help-icon"><Headset size={19} aria-hidden="true" /></span>
          <span><small>Yordam kerakmi?</small><strong>+998 71 200 00 00</strong></span>
        </a>
        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <nav className="mobile-menu" aria-label="Mobil menyu">
          <button className={activeView === "fields" ? "mobile-menu-link active" : "mobile-menu-link"} onClick={() => navigate("fields")}>Maydonlar</button>
          <button className={activeView === "schedule" ? "mobile-menu-link active" : "mobile-menu-link"} onClick={() => navigate("schedule")}>Bo‘sh vaqtlar</button>
          <a className="mobile-menu-help" href="tel:+998712000000"><Headset size={18} /> +998 71 200 00 00</a>
        </nav>
      )}
    </header>
  );
}