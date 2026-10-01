"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export type PriceFilter = "all" | "under150" | "150to200" | "over200";

interface SearchFilterProps {
  query: string;
  district: string;
  price: PriceFilter;
  districts: string[];
  onQueryChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onPriceChange: (value: PriceFilter) => void;
}

export function SearchFilter({ query, district, price, districts, onQueryChange, onDistrictChange, onPriceChange }: SearchFilterProps) {
  return (
    <section className="filter-bar" aria-label="Maydonlarni qidirish va filtrlash">
      <label className="search-control">
        <Search size={20} aria-hidden="true" />
        <span className="sr-only">Maydon nomi yoki manzil bo‘yicha qidirish</span>
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Maydon yoki manzilni qidiring" />
      </label>
      <label className="select-control">
        <SlidersHorizontal size={18} aria-hidden="true" />
        <span className="sr-only">Tuman bo‘yicha filter</span>
        <select value={district} onChange={(event) => onDistrictChange(event.target.value)}>
          <option value="all">Barcha tumanlar</option>
          {districts.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <label className="select-control price-select">
        <span className="sr-only">Narx bo‘yicha filter</span>
        <select value={price} onChange={(event) => onPriceChange(event.target.value as PriceFilter)}>
          <option value="all">Har qanday narx</option>
          <option value="under150">150 000 so‘mgacha</option>
          <option value="150to200">150 000 – 200 000</option>
          <option value="over200">200 000 so‘mdan yuqori</option>
        </select>
      </label>
    </section>
  );
}