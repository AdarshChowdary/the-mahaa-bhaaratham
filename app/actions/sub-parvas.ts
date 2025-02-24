'use server'

import pool from '@/lib/db'

export async function getSubParvas(parvaName: string) {
  try {
      const client = await pool.connect();
      
      const result = await client.query(
          `SELECT sub_parva_name, parva_name, id 
           FROM sub_parvas 
           WHERE parva_name = $1 
           ORDER BY id`,
          [parvaName]
      );
      
      client.release();
      
      return result.rows;
  } catch (error) {
      console.error('Failed to fetch sub-paravas:', error);
      throw new Error('Failed to fetch sub-paravas');
  }
}
