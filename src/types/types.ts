export type Character = {
  id: number
  name: string
  height: number
  mass: number
  gender: string
  homeworld: string
  wiki: string
  image: string
  born: number
  bornLocation: string
  died: number
  diedLocation: string
  species: string
  hairColor: string
  eyeColor: string
  skinColor: string
  cybernetics: string
  affiliations: string[]
  masters: string[]
  apprentices: string[]
  formerAffiliations: string[]
}

export enum OptionalGameStatus {
  START = 'START',
  SIDE_CHOSEN = 'SIDE_CHOSEN',
  DIFF_CHOSEN = 'DIFF_CHOSEN',
  GAME_END = 'GAME_END',
}

export enum OptionalDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum OptionalSide {
  SITH = 'Sith',
  JEDI = 'Jedi',
}

export enum GameEnd {
  WINNER = 'WINNER',
  LOSER = 'LOOSER',
}
