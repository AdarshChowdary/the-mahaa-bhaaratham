'use server'

import pool from '@/lib/db'

export async function getSections(subParvaName: string, page: number = 1, pageSize: number = 10) {
  try {
    const client = await pool.connect()
    
    const offset = (page - 1) * pageSize;
    
    const totalQuery = `
      SELECT COUNT(*) as total 
      FROM sections 
      WHERE LOWER(sub_parva_name) = LOWER($1)
    `;
    
    const sectionsQuery = `
      SELECT section_number, sub_parva_name 
      FROM sections 
      WHERE LOWER(sub_parva_name) = LOWER($1)
      ORDER BY section_number
      LIMIT $2 OFFSET $3
    `;
    
    const totalResult = await client.query(totalQuery, [subParvaName]);
    const total = parseInt(totalResult.rows[0].total);
    
    const result = await client.query(sectionsQuery, [subParvaName, pageSize, offset]);
    
    client.release()
    
    return {
      sections: result.rows,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }
  } catch (error) {
    console.error('Failed to fetch sections:', error)
    throw new Error('Failed to fetch sections')
  }
}