import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
      // Get parva_name from query parameters
      const searchParams = request.nextUrl.searchParams;
      const parvaName = searchParams.get('parva');

      if (!parvaName) {
          return NextResponse.json(
              { error: 'Parva name is required' },
              { status: 400 }
          );
      }

      const client = await pool.connect();
      
      const result = await client.query(
          `SELECT sub_parva_name, parva_name, id
           FROM sub_parvas 
           WHERE parva_name = $1 
           ORDER BY id`,
          [parvaName]
      );
      
      client.release();
      
      return NextResponse.json(result.rows);
  } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
          { error: 'Failed to fetch sub-parvas' }, 
          { status: 500 }
      );
  }
}
