'use server'

import pool from '@/lib/db'

export async function getParvas() {
  try {
    const client = await pool.connect()
    
    const result = await client.query(`
      SELECT parva_name FROM parvas ORDER BY id
    `)
    
    client.release()
    
    return result.rows
  } catch (error) {
    console.error('Failed to fetch characters:', error)
    throw new Error('Failed to fetch characters')
  }
}