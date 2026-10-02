export type LevelKey = 'mudah' | 'sedang' | 'sulit' | 'hots';

export type VillageItemKey = 
  | 'beras'
  | 'sayur'
  | 'buah'
  | 'telur'
  | 'madu'
  | 'ikan'
  | 'kayu'
  | 'bibit';

export interface QuestionData {
  id: string;
  dividend: number;
  divisor: number;
  itemKey: VillageItemKey;
  itemName: string;
  unitName: string;
  story: string;
  contextTitle: string;
  isHots?: boolean;
  explanation?: string;
  hint?: string;
}

export type ScreenState = 'cover' | 'levels' | 'game' | 'result';

export type CharacterMood = 'normal' | 'thinking' | 'happy' | 'serious' | 'surprised' | 'spirited';
