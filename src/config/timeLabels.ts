// =======================================
// src/config/timeLabels.ts
// =======================================
import type { TimezoneId } from "@/tools/timeTools";

/**
 * Human-friendly labels for each supported timezone.
 */
export const TIMEZONE_LABELS: Record<TimezoneId, string> = {
  "Asia/Tokyo": "Tokyo",
  "America/New_York": "New York",
  "Europe/London": "London",
  UTC: "Coordinated Universal Time (UTC)",
};

/**
 * Common shape for human-friendly time results.
 */
export interface HumanTimeResult {
  timezone: TimezoneId;
  iso: string;
  label: string;   // machine-ish label from timeTools (e.g. "2025-11-14T17:33:46 Asia/Tokyo")
  city: string;    // human label from TIMEZONE_LABELS
  sentence: string; // human-friendly sentence
}