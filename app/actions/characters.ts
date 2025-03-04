// app/actions/characters.ts
'use server'

import pool from '@/lib/db'
import { Character, GroupedCharacters, CHARACTERS_PER_LETTER } from '@/types/characters'

export async function getCharactersGrouped(): Promise<GroupedCharacters> {
  try {
    const client = await pool.connect()
    
    const countQuery = `
      SELECT 
        LEFT(name, 1) as letter,
        COUNT(*) as total
      FROM characters 
      GROUP BY LEFT(name, 1)
    `
    
    const charactersQuery = `
      WITH RankedCharacters AS (
        SELECT 
          id,
          name,
          LEFT(name, 1) as letter,
          ROW_NUMBER() OVER (PARTITION BY LEFT(name, 1) ORDER BY name) as rn
        FROM characters
      )
      SELECT id, name, letter
      FROM RankedCharacters
      WHERE rn <= ${CHARACTERS_PER_LETTER}
      ORDER BY letter, name
    `
    
    const [countResult, charactersResult] = await Promise.all([
      client.query(countQuery),
      client.query(charactersQuery)
    ])
    
    client.release()
    
    const groupedResults: GroupedCharacters = {}
    
    countResult.rows.forEach(row => {
      groupedResults[row.letter.toUpperCase()] = {
        characters: [],
        total: parseInt(row.total)
      }
    })
    
    charactersResult.rows.forEach(row => {
      const letter = row.letter.toUpperCase()
      if (!groupedResults[letter]) {
        groupedResults[letter] = {
          characters: [],
          total: 0
        }
      }
      groupedResults[letter].characters.push({
        id: row.id,
        name: row.name
      })
    })
    
    return groupedResults
    
  } catch (error) {
    console.error('Failed to fetch characters:', error)
    throw new Error('Failed to fetch characters')
  }
}

export async function getCharactersByLetter(letter: string): Promise<Character[]> {
  try {
    const client = await pool.connect()
    
    const result = await client.query(`
      SELECT id, name 
      FROM characters 
      WHERE LEFT(name, 1) ILIKE $1
      ORDER BY name
    `, [letter])
    
    client.release()
    
    return result.rows
  } catch (error) {
    console.error('Failed to fetch characters by letter:', error)
    throw new Error('Failed to fetch characters by letter')
  }
}

interface CharacterDetails {
  id: number;
  name: string;
  image?: string;
  description: string;
  parents: string;
  wives?: string;
  children?: string;
  husband?: string;
  gender?: string;
}

export async function getCharacterDetails(name: string): Promise<CharacterDetails | null> {
  try {
    const client = await pool.connect();
    
    // Convert hyphenated URL name back to normal name format
    const normalizedName = name.replace(/-/g, ' ');
    
    const result = await client.query(`
      SELECT 
        c.id,
        c.name,
        c.image,
        c.description,
        c.parents,
        c.wives,
        c.children,
        c.husband,
        c.gender
      FROM characters c
      WHERE LOWER(c.name) = LOWER($1)
    `, [normalizedName]);
    
    client.release();

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
    
  } catch (error) {
    console.error('Failed to fetch character details:', error);
    throw new Error('Failed to fetch character details');
  }
}

export async function searchCharacters(query: string): Promise<Character[]> {
  try {
    const client = await pool.connect()
    
    const result = await client.query(`
      SELECT id, name 
      FROM characters 
      WHERE name ILIKE $1
      ORDER BY name
    `, [`%${query}%`])
    
    client.release()
    
    return result.rows
  } catch (error) {
    console.error('Failed to search characters:', error)
    throw new Error('Failed to search characters')
  }
}