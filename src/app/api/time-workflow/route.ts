import { NextRequest, NextResponse } from 'next/server';
import { runTimeWorkflow } from '@/orchestrators/timeWorkflow';
import type { TimezoneId } from '@/tools/timeTools';

interface RequestBody {
  sourceTimezone?: TimezoneId;
  targetTimezones?: TimezoneId[];
}

export async function GET() {
  try {
    const result = runTimeWorkflow();
    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    
    const result = runTimeWorkflow({
      sourceTimezone: body.sourceTimezone,
      targetTimezones: body.targetTimezones,
    });

    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

