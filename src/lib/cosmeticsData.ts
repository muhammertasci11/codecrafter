export type CosmeticCategory = 'avatarFrame' | 'nameColor' | 'codeTheme' | 'victoryEffect'

export interface CosmeticItem {
  id: string
  category: CosmeticCategory
  name: string
  description: string
  price: number // in coins
  icon: string
  value: string // CSS value or class name depending on type
}

export const COSMETICS: CosmeticItem[] = [
  // Avatar Frames
  { id: 'frame_gold', category: 'avatarFrame', name: 'Altın Çerçeve', description: 'Profilin için parlayan altın çerçeve', price: 100, icon: '🌟', value: 'ring-4 ring-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]' },
  { id: 'frame_neon', category: 'avatarFrame', name: 'Neon Mavi', description: 'Siberpunk tarzı neon mavi', price: 150, icon: '🔵', value: 'ring-4 ring-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.7)]' },
  { id: 'frame_fire', category: 'avatarFrame', name: 'Ateş Çemberi', description: 'Ateşli kırmızı çerçeve', price: 200, icon: '🔥', value: 'ring-4 ring-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]' },

  // Name Colors
  { id: 'color_hacker', category: 'nameColor', name: 'Hacker Yeşili', description: 'Matrix tarzı yeşil isim', price: 50, icon: '🟩', value: 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]' },
  { id: 'color_pink', category: 'nameColor', name: 'Neon Pembe', description: 'Parlak neon pembe isim', price: 75, icon: '🟪', value: 'text-pink-400 drop-shadow-[0_0_5px_rgba(244,114,182,0.8)]' },
  { id: 'color_gold', category: 'nameColor', name: 'Kraliyet Altını', description: 'Prestijli altın sarısı', price: 120, icon: '🟨', value: 'text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]' },

  // Code Themes
  { id: 'theme_dracula', category: 'codeTheme', name: 'Dracula', description: 'Karanlık ve vampirik kod teması', price: 300, icon: '🧛', value: 'theme-dracula' },
  { id: 'theme_synthwave', category: 'codeTheme', name: 'Synthwave', description: '80ler retro fütüristik tema', price: 350, icon: '🌆', value: 'theme-synthwave' },
  { id: 'theme_matrix', category: 'codeTheme', name: 'Matrix', description: 'Klasik terminal görünümü', price: 400, icon: '💻', value: 'theme-matrix' },

  // Victory Effects
  { id: 'effect_confetti', category: 'victoryEffect', name: 'Konfeti Yağmuru', description: 'Bölüm sonu konfeti efekti', price: 250, icon: '🎉', value: 'confetti' },
  { id: 'effect_fireworks', category: 'victoryEffect', name: 'Havai Fişek', description: 'Görkemli havai fişek gösterisi', price: 400, icon: '🎆', value: 'fireworks' },
  { id: 'effect_lightning', category: 'victoryEffect', name: 'Yıldırım Fırtınası', description: 'Elektrik saçan zafer efekti', price: 500, icon: '⚡', value: 'lightning' },
]

export function getCosmeticsByCategory(category: CosmeticCategory) {
  return COSMETICS.filter(c => c.category === category)
}
