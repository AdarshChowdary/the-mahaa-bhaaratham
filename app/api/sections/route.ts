import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subParvaName = searchParams.get('subParvaName');

    if (!subParvaName) {
      return NextResponse.json(
        { error: 'Sub Parva name is required' },
        { status: 400 }
      );
    }

    const client = await pool.connect();
    
    const query = `
      SELECT section_number, sub_parva_name 
      FROM sections 
      WHERE LOWER(sub_parva_name) = LOWER($1)
      ORDER BY section_number
    `;
    
    const result = await client.query(query, [subParvaName]);
    
    client.release();
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sections' }, 
      { status: 500 }
    );
  }
}

