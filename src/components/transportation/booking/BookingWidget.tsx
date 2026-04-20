"use client";
import { useState } from "react";
import CharterForm from "./charter/CharterForm";
import HireDriverForm from "./hire-driver/HireDriverForm";
import SelfDriveForm from "./self-drive/SelfDriveForm";

type Tab = "charter" | "hire-driver" | "self-drive";

export default function BookingWidget() {
  const [activeTab, setActiveTab] = useState<Tab>("charter");

  const tabs: { key: Tab; label: string }[] = [
    { key: "charter", label: "Charter Bus" },
    { key: "hire-driver", label: "Hire Driver" },
    { key: "self-drive", label: "Self-Drive" },
  ];

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-8 py-5 text-xs tracking-[0.2em] uppercase transition-colors duration-200
    ${
      activeTab === tab.key
        ? "text-white border-b border-white -mb-px"
        : "text-white/40 hover:text-white/70"
    }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "charter" && <CharterForm />}
      {activeTab === "hire-driver" && <HireDriverForm />}
      {activeTab === "self-drive" && <SelfDriveForm />}
    </div>
  );
}
