import { convertIsoToZone, type TimezoneId, type ZonedTime } from '@/tools/timeTools';

export interface TimeConvertAgentConfig {
  sourceIso: string;
  targetTimezones: TimezoneId[];
}

/**
 * Agent that converts a source ISO timestamp into multiple target timezones.
 */
export class TimeConvertAgent {
  private config: TimeConvertAgentConfig;

  constructor(config: TimeConvertAgentConfig) {
    this.config = config;
  }

  execute(): ZonedTime[] {
    return this.config.targetTimezones.map(timezone => 
      convertIsoToZone(this.config.sourceIso, timezone)
    );
  }
}

