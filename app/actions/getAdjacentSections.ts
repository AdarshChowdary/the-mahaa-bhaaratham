'use server'

import pool from '@/lib/db'

// Type for section details
export interface SectionDetails {
  section_number: number;
  sub_parva_name: string;
  parva_name: string;
}

export async function getAdjacentSections(currentSectionNumber: number): Promise<{
  current: SectionDetails | null;
  previous: SectionDetails | null;
  next: SectionDetails | null;
}> {
  try {
    const client = await pool.connect()
    
    // First get the current section to verify it exists
    const currentResult = await client.query(`
      SELECT section_number, sub_parva_name, parva_name 
      FROM sections 
      WHERE section_number = $1
    `, [currentSectionNumber])
    
    const current = currentResult.rows[0] || null
    
    // Get previous section (can be in a different sub-parva or parva)
    const previousResult = await client.query(`
      SELECT section_number, sub_parva_name, parva_name 
      FROM sections 
      WHERE section_number < $1
      ORDER BY section_number DESC
      LIMIT 1
    `, [currentSectionNumber])
    
    const previous = previousResult.rows[0] || null
    
    // Get next section (can be in a different sub-parva or parva)
    const nextResult = await client.query(`
      SELECT section_number, sub_parva_name, parva_name 
      FROM sections 
      WHERE section_number > $1
      ORDER BY section_number ASC
      LIMIT 1
    `, [currentSectionNumber])
    
    const next = nextResult.rows[0] || null
    
    client.release()
    
    return { current, previous, next }
  } catch (error) {
    console.error('Failed to fetch adjacent sections:', error)
    throw new Error('Failed to fetch adjacent sections')
  }
}