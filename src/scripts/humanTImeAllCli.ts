// src/scripts/humanTimeAllCli.ts
import { runAllHumanTimesWorkflow } from "@/orchestrators/humanTimeWorkflow";

async function main() {
  const results = await runAllHumanTimesWorkflow();

  console.log("Current times in all demo timezones:\n");

  for (const item of results) {
    console.log(
      `- ${item.city} (${item.timezone}): ${item.sentence}`
    );
  }

  console.log("\nJSON payload (for debugging):");
  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error("Error in humanTimeAllCli:", err);
  process.exit(1);
});
