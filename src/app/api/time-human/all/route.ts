import { NextResponse } from 'next/server';
import { runAllHumanTimesWorkflow } from '@/orchestrators/humanTimeWorkflow';

export async function GET() {
  try {
    const results = await runAllHumanTimesWorkflow();
    return NextResponse.json({ ok: true, data: results });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

