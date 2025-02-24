'use server'

import pool from '@/lib/db'

export async function getSections() {
  try {
    const client = await pool.connect()
    
    const result = await client.query(`
      SELECT section_number, description, sub_parva_name FROM sections ORDER BY id
    `)
    
    client.release()
    
    return result.rows
  } catch (error) {
    console.error('Failed to fetch characters:', error)
    throw new Error('Failed to fetch characters')
  }
}