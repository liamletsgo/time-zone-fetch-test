import { describe, it, expect } from 'vitest';
import type { TimezoneId } from '@/tools/timeTools';
import { runTimeWorkflow } from './timeWorkflow';
import { runAllHumanTimesWorkflow } from './humanTimeWorkflow';

describe('runTimeWorkflow', () => {
  it('should return source and targets with default config', () => {
    const result = runTimeWorkflow();

    expect(result).toHaveProperty('source');
    expect(result).toHaveProperty('targets');
    expect(Array.isArray(result.targets)).toBe(true);
    expect(result.targets.length).toBe(3); // Default: America/New_York, Europe/London, UTC
    expect(result.source.timezone).toBe('Asia/Tokyo'); // Default source
  });

  it('should use custom source timezone', () => {
    const result = runTimeWorkflow({ sourceTimezone: 'UTC' });

    expect(result.source.timezone).toBe('UTC');
    expect(result.targets.length).toBe(3);
  });

  it('should use custom target timezones', () => {
    const customTargets: TimezoneId[] = ['UTC', 'Asia/Tokyo'];
    const result = runTimeWorkflow({ targetTimezones: customTargets });

    expect(result.targets.length).toBe(2);
    expect(result.targets[0].timezone).toBe('UTC');
    expect(result.targets[1].timezone).toBe('Asia/Tokyo');
  });

  it('should use both custom source and target timezones', () => {
    const result = runTimeWorkflow({
      sourceTimezone: 'Europe/London',
      targetTimezones: ['UTC'],
    });

    expect(result.source.timezone).toBe('Europe/London');
    expect(result.targets.length).toBe(1);
    expect(result.targets[0].timezone).toBe('UTC');
  });

  it('should have valid ISO timestamps in source and targets', () => {
    const result = runTimeWorkflow();

    expect(result.source.iso).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    result.targets.forEach(target => {
      expect(target.iso).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });
});

describe("runAllHumanTimesWorkflow orchestrator", () => {
  it("returns all supported timezones in a stable order", async () => {
    const results = await runAllHumanTimesWorkflow();

    // Expect four entries
    expect(results.length).toBe(4);

    // Exact order we care about
    const expectedOrder = [
      "Asia/Tokyo",
      "America/New_York",
      "Europe/London",
      "UTC",
    ];

    const actualOrder = results.map((r) => r.timezone);
    expect(actualOrder).toEqual(expectedOrder);

    // Each result should have a non-empty city and sentence
    for (const r of results) {
      expect(typeof r.city).toBe("string");
      expect(r.city.length).toBeGreaterThan(0);

      expect(typeof r.sentence).toBe("string");
      expect(r.sentence.length).toBeGreaterThan(0);
    }
  });
});


