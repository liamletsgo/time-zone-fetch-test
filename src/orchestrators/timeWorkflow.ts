import { TimeSourceAgent } from '@/agents/timeSourceAgent';
import { TimeConvertAgent } from '@/agents/timeConvertAgent';
import type { TimezoneId, ZonedTime } from '@/tools/timeTools';

export interface TimeWorkflowConfig {
  sourceTimezone?: TimezoneId;
  targetTimezones?: TimezoneId[];
}

export interface TimeWorkflowResult {
  source: ZonedTime;
  targets: ZonedTime[];
}

const DEFAULT_SOURCE_TIMEZONE: TimezoneId = "Asia/Tokyo";
const DEFAULT_TARGET_TIMEZONES: TimezoneId[] = ["America/New_York", "Europe/London", "UTC"];

/**
 * Orchestrator that coordinates TimeSourceAgent and TimeConvertAgent
 * to get current time in source timezone and convert it to target timezones.
 */
export function runTimeWorkflow(config: TimeWorkflowConfig = {}): TimeWorkflowResult {
  const sourceTimezone = config.sourceTimezone || DEFAULT_SOURCE_TIMEZONE;
  const targetTimezones = config.targetTimezones || DEFAULT_TARGET_TIMEZONES;

  // Step 1: Get current time in source timezone
  const sourceAgent = new TimeSourceAgent({ sourceTimezone });
  const source = sourceAgent.execute();

  // Step 2: Convert source ISO to target timezones
  const convertAgent = new TimeConvertAgent({
    sourceIso: source.iso,
    targetTimezones,
  });
  const targets = convertAgent.execute();

  return {
    source,
    targets,
  };
}

