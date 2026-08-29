import { useState } from "react";
import BusinessCard from "../components/Businesscard";
import { businesses } from "../data/business";

const categories = ["All", "Hospital", "Bank", "Government", "Beauty", "Valet"];

export default function Browse({ onSelect }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const results = businesses.filter((b) => {
    const haystack = (b.name + b.service + b.area).toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesCategory =
      category === "All" || haystack.includes(category.toLowerCase());
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-[40px] font-extrabold tracking-tight leading-tight">
          Skip the line
        </h1>
        <p className="text-lg text-ink-2">
          {results.length} places near Nairobi with a live queue right now.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 h-16 pl-6 pr-2 rounded-full border border-line shadow-card max-w-2xl">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
            <circle cx="9" cy="9" r="6.2" stroke="#717171" strokeWidth="1.8" />
            <path d="M13.6 13.8L17 17" stroke="#717171" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a hospital, bank or salon"
            className="flex-1 h-full bg-transparent text-[15px] placeholder:text-ink-2 focus:outline-none"
          />
          <span className="h-12 px-6 rounded-full bg-gradient-to-r from-brand to-brand-dark text-white font-semibold text-[15px] flex items-center">
            Search
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`h-10 px-4 rounded-full border text-sm transition-colors ${
                c === category
                  ? "bg-ink text-white border-ink font-semibold"
                  : "bg-canvas text-ink-2 border-line hover:border-ink hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
          {results.map((business) => (
            <BusinessCard key={business.id} business={business} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center gap-2">
          <h3 className="text-xl font-bold">No matches for “{query}”</h3>
          <p className="text-ink-2">Try a shorter search, or clear it to see everything.</p>
        </div>
      )}
    </div>
  );
}