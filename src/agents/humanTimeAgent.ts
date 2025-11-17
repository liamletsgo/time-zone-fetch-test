// =======================================
// src/agents/humanTimeAgent.ts
// =======================================
import type { TimezoneId } from "@/tools/timeTools";
import { getCurrentTimeInZone } from "@/tools/timeTools";
import { TIMEZONE_LABELS, type HumanTimeResult } from "@/config/timeLabels";

/**
 * HumanTimeAgent:
 * Given a timezone, returns a structured, human-friendly description of the current time.
 */
export class HumanTimeAgent {
  run(timezone: TimezoneId): HumanTimeResult {
    // Use existing tool to get the base time info
    const zoned = getCurrentTimeInZone(timezone);

    // Look up a friendly city label (fallback to the raw timezone string)
    const city = TIMEZONE_LABELS[timezone] ?? timezone;

    // Use the ISO timestamp as the single source of truth for the Date
    const date = new Date(zoned.iso);

    // Build a human-readable date/time string in the given timezone
    const formatted = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    const sentence = `The time in ${city} is ${formatted}.`;

    return {
      timezone,
      iso: zoned.iso,
      label: zoned.label,
      city,
      sentence,
    };
  }
}