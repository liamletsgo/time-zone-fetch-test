import { describe, it, expect } from 'vitest';
import { getCurrentTimeInZone, convertIsoToZone, type TimezoneId } from './timeTools';

describe('timeTools', () => {
  describe('getCurrentTimeInZone', () => {
    it('should return a ZonedTime with correct structure', () => {
      const result = getCurrentTimeInZone('UTC');
      
      expect(result).toHaveProperty('timezone', 'UTC');
      expect(result).toHaveProperty('iso');
      expect(result).toHaveProperty('label');
      expect(typeof result.iso).toBe('string');
      expect(typeof result.label).toBe('string');
    });

    it('should work with all supported timezones', () => {
      const timezones: TimezoneId[] = ['UTC', 'Asia/Tokyo', 'America/New_York', 'Europe/London'];
      
      timezones.forEach(timezone => {
        const result = getCurrentTimeInZone(timezone);
        expect(result.timezone).toBe(timezone);
        expect(result.iso).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
      });
    });
  });

  describe('convertIsoToZone', () => {
    const testIso = '2024-01-15T12:00:00.000Z';

    it('should convert ISO string to ZonedTime', () => {
      const result = convertIsoToZone(testIso, 'UTC');
      
      expect(result).toHaveProperty('timezone', 'UTC');
      expect(result).toHaveProperty('iso');
      expect(result).toHaveProperty('label');
    });

    it('should work with all supported timezones', () => {
      const timezones: TimezoneId[] = ['UTC', 'Asia/Tokyo', 'America/New_York', 'Europe/London'];
      
      timezones.forEach(timezone => {
        const result = convertIsoToZone(testIso, timezone);
        expect(result.timezone).toBe(timezone);
        expect(result.iso).toBe(testIso);
      });
    });

    it('should throw error for invalid ISO string', () => {
      expect(() => {
        convertIsoToZone('invalid-iso', 'UTC');
      }).toThrow('Invalid ISO timestamp');
    });
  });
});

