// src/app/time-human/page.tsx
"use client";

import { useState } from "react";

type ApiSingleResponse = {
  ok: boolean;
  data?: {
    timezone: string;
    iso: string;
    label: string;
    city: string;
    sentence: string;
  };
  error?: string;
};

type ApiAllResponse = {
  ok: boolean;
  data?: {
    timezone: string;
    iso: string;
    label: string;
    city: string;
    sentence: string;
  }[];
  error?: string;
};

const TIMEZONE_OPTIONS = [
  { value: "Asia/Tokyo", label: "Tokyo (Asia/Tokyo)" },
  { value: "America/New_York", label: "New York (America/New_York)" },
  { value: "Europe/London", label: "London (Europe/London)" },
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
];

export default function TimeHumanPage() {
  const [selectedTz, setSelectedTz] = useState("America/New_York");
  const [sentence, setSentence] = useState<string | null>(null);
  const [allSentences, setAllSentences] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleShowOne() {
    setLoading(true);
    setError(null);
    setSentence(null);
    setAllSentences([]);

    try {
      const res = await fetch(
        `/api/time-human?tz=${encodeURIComponent(selectedTz)}`
      );
      const json: ApiSingleResponse = await res.json();

      if (!json.ok || !json.data) {
        setError(json.error ?? "Unexpected error");
        return;
      }

      setSentence(json.data.sentence);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch time.");
    } finally {
      setLoading(false);
    }
  }

  async function handleShowAll() {
    setLoading(true);
    setError(null);
    setSentence(null);
    setAllSentences([]);

    try {
      const res = await fetch("/api/time-human/all");
      const json: ApiAllResponse = await res.json();

      if (!json.ok || !json.data) {
        setError(json.error ?? "Unexpected error");
        return;
      }

      setAllSentences(json.data.map((item) => item.sentence));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch times.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-bold">Human-Friendly Time Demo</h1>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Select a timezone
        </label>
        <select
          value={selectedTz}
          onChange={(e) => setSelectedTz(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          {TIMEZONE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleShowOne}
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-600 text-white text-sm disabled:opacity-50"
        >
          {loading ? "Loading..." : "Show Time"}
        </button>
        <button
          onClick={handleShowAll}
          disabled={loading}
          className="px-4 py-2 rounded bg-gray-200 text-sm disabled:opacity-50"
        >
          {loading ? "Loading..." : "Show All Timezones"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      {sentence && (
        <div className="mt-4 p-4 rounded bg-green-50 border border-green-100">
          <p className="text-lg font-semibold">{sentence}</p>
        </div>
      )}

      {allSentences.length > 0 && (
        <div className="mt-4 space-y-2">
          <h2 className="text-lg font-semibold">All Timezones</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {allSentences.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
