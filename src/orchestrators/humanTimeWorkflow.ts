// =======================================
// src/orchestrators/humanTimeWorkflow.ts
// =======================================
import type { TimezoneId } from '@/tools/timeTools';
import type { HumanTimeResult } from "@/config/timeLabels";
import { HumanTimeAgent } from "@/agents/humanTimeAgent";

/**
 * Orchestrator for a single timezone:
 * Calls HumanTimeAgent and returns a HumanTimeResult.
 */
export async function runHumanTimeWorkflow(
  timezone: TimezoneId
): Promise<HumanTimeResult> {
  const agent = new HumanTimeAgent();
  return agent.run(timezone);
}

/**
 * Orchestrator for all supported timezones:
 * Calls HumanTimeAgent for each timezone and returns an array of results.
 */
export async function runAllHumanTimesWorkflow(): Promise<HumanTimeResult[]> {
  const agent = new HumanTimeAgent();

  const timezones: TimezoneId[] = [
    "Asia/Tokyo",
    "America/New_York",
    "Europe/London",
    "UTC",
  ];

  return timezones.map((tz) => agent.run(tz));
}