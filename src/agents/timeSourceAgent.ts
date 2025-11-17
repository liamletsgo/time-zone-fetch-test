import { getCurrentTimeInZone, type TimezoneId, type ZonedTime } from '@/tools/timeTools';

export interface TimeSourceAgentConfig {
  sourceTimezone: TimezoneId;
}

/**
 * Agent that returns the current time in a configured source timezone.
 */
export class TimeSourceAgent {
  private config: TimeSourceAgentConfig;

  constructor(config: TimeSourceAgentConfig) {
    this.config = config;
  }

  execute(): ZonedTime {
    return getCurrentTimeInZone(this.config.sourceTimezone);
  }
}

