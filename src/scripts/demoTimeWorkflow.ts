// src/scripts/demoTimeWorkflow.ts
import { runTimeWorkflow } from "@/orchestrators/timeWorkflow";
import type { TimezoneId } from "@/tools/timeTools";

async function main() {
  const sourceTimezone: TimezoneId = "Asia/Tokyo";
  const targetTimezones: TimezoneId[] = [
    "America/New_York",
    "Europe/London",
    "UTC",
  ];

  const result = await runTimeWorkflow({
    sourceTimezone,
    targetTimezones,
  });

  console.log("Source time:");
  console.table([result.source]);

  console.log("Target times:");
  console.table(result.targets);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
