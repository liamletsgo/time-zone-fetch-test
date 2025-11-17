import { NextRequest, NextResponse } from 'next/server';
import { runHumanTimeWorkflow } from '@/orchestrators/humanTimeWorkflow';
import type { TimezoneId } from '@/tools/timeTools';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tz = searchParams.get('tz');

    if (!tz) {
      return NextResponse.json(
        { ok: false, error: 'Missing timezone parameter (tz)' },
        { status: 400 }
      );
    }

    // Validate timezone
    const validTimezones: TimezoneId[] = ['Asia/Tokyo', 'America/New_York', 'Europe/London', 'UTC'];
    if (!validTimezones.includes(tz as TimezoneId)) {
      return NextResponse.json(
        { ok: false, error: `Invalid timezone: ${tz}` },
        { status: 400 }
      );
    }

    const result = await runHumanTimeWorkflow(tz as TimezoneId);
    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

