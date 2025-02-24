// types/characters.ts
export const CHARACTERS_PER_LETTER = 4

export interface Character {
  id: number;
  name: string;
}

export interface GroupedCharactersData {
  characters: Character[];
  total: number;
}

export interface GroupedCharacters {
  [key: string]: GroupedCharactersData;
}
