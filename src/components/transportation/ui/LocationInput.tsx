// components/transportation/ui/LocationInput.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { SearchResult } from "@/lib/transportation/cities/las-vegas";

interface LocationInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string, result?: SearchResult) => void;
  onSearch: (query: string) => SearchResult[];
  filterType?: "location" | "airport";
  disabled?: boolean;
}

export default function LocationInput({
  label,
  placeholder = "Enter location",
  value,
  onChange,
  onSearch,
  filterType,
  disabled = false,
}: LocationInputProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    onChange(q, undefined);
    setActiveIndex(-1);

    let results = onSearch(q);
    if (filterType) {
      results = results.filter((r) => r.type === filterType);
    }
    setSuggestions(results);
    setIsOpen(results.length > 0);
  }

  function handleSelect(result: SearchResult) {
    setQuery(result.name);
    onChange(result.name, result);
    setSuggestions([]);
    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  function getZoneBadge(result: SearchResult) {
    if (result.type === "airport") {
      return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 shrink-0">
          Airport
        </span>
      );
    }
    switch (result.zone) {
      case "strip":
      case "downtown":
        return (
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 shrink-0">
            {result.zone === "strip" ? "Strip" : "Downtown"}
          </span>
        );
      case "off-strip":
      case "henderson":
        return (
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 shrink-0">
            {result.zone === "henderson" ? "Henderson" : "Off-Strip"}
          </span>
        );
      default:
        return null;
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <p className="text-[10px] tracking-widest text-white/40 uppercase mb-1.5">
        {label}
      </p>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full bg-transparent border-b text-sm py-1.5 pr-6 outline-none transition-colors duration-200
            ${
              disabled
                ? "border-white/10 text-white/20 placeholder-white/10 cursor-not-allowed"
                : "border-white/20 focus:border-white/50 text-white placeholder-white/30"
            }`}
        />
        {query && !disabled && (
          <button
            onClick={() => {
              setQuery("");
              onChange("", undefined);
              setSuggestions([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          className="absolute z-50 top-full left-0 right-0 mt-1
                       bg-[#0A1E38] border border-white/10 rounded-lg
                       shadow-xl overflow-hidden max-h-60 overflow-y-auto"
        >
          {suggestions.map((result, i) => (
            <li
              key={result.name}
              onMouseDown={() => handleSelect(result)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex items-center justify-between px-4 py-2.5 cursor-pointer
                         text-sm transition-colors duration-100
                         ${i === activeIndex ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              <span className="text-white/90 truncate mr-2">{result.name}</span>
              {getZoneBadge(result)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
