// app/api/characters/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    
    const result = await client.query(
      'SELECT name FROM characters ORDER BY name ASC'
    );
    
    client.release(); // Important: Release the client back to the pool
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch characters' }, 
      { status: 500 }
    );
  }
}