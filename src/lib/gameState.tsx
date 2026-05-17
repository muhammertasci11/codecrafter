'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { onAuthChange } from './firebase'

export interface FirebaseUser {
  uid: string
  displayName: string
  email: string
  photoURL: string
}

export type Language = 'javascript' | 'python' | 'java' | 'typescript' | 'csharp' | 'cpp' | 'c' | 'go' | 'rust' | 'kotlin' | 'swift' | 'php' | 'ruby' | 'scala' | 'dart' | 'r' | 'haskell' | 'lua' | 'perl' | 'julia' | 'sql' | 'bash' | 'html' | 'css'

export type UiLanguage = 'tr' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ar' | 'zh' | 'ja' | 'ko' | 'nl' | 'pl' | 'sv' | 'el' | 'hi'

export const ALL_LANGUAGES: { id: Language; name: string; nameEn: string; icon: string; color: string; tier: 'full' | 'partial' | 'concept' }[] = [
  { id: 'javascript', name: 'JavaScript', nameEn: 'JavaScript', icon: '🟨', color: '#f7df1e', tier: 'full' },
  { id: 'python', name: 'Python', nameEn: 'Python', icon: '🐍', color: '#3776ab', tier: 'full' },
  { id: 'java', name: 'Java', nameEn: 'Java', icon: '☕', color: '#ed8b00', tier: 'full' },
  { id: 'typescript', name: 'TypeScript', nameEn: 'TypeScript', icon: '🔵', color: '#3178c6', tier: 'partial' },
  { id: 'csharp', name: 'C#', nameEn: 'C#', icon: '🟣', color: '#6a1b9a', tier: 'partial' },
  { id: 'cpp', name: 'C++', nameEn: 'C++', icon: '⚙️', color: '#00599c', tier: 'partial' },
  { id: 'c', name: 'C', nameEn: 'C', icon: '🔧', color: '#555555', tier: 'partial' },
  { id: 'go', name: 'Go', nameEn: 'Go', icon: '🐹', color: '#00add8', tier: 'partial' },
  { id: 'rust', name: 'Rust', nameEn: 'Rust', icon: '🦀', color: '#dea584', tier: 'partial' },
  { id: 'kotlin', name: 'Kotlin', nameEn: 'Kotlin', icon: '🅺', color: '#7f52ff', tier: 'partial' },
  { id: 'swift', name: 'Swift', nameEn: 'Swift', icon: '🐦', color: '#f05138', tier: 'partial' },
  { id: 'php', name: 'PHP', nameEn: 'PHP', icon: '🐘', color: '#777bb4', tier: 'partial' },
  { id: 'ruby', name: 'Ruby', nameEn: 'Ruby', icon: '💎', color: '#cc342d', tier: 'partial' },
  { id: 'scala', name: 'Scala', nameEn: 'Scala', icon: '🔥', color: '#dc322f', tier: 'concept' },
  { id: 'dart', name: 'Dart', nameEn: 'Dart', icon: '🎯', color: '#0175c2', tier: 'concept' },
  { id: 'r', name: 'R', nameEn: 'R', icon: '📊', color: '#276dc3', tier: 'concept' },
  { id: 'haskell', name: 'Haskell', nameEn: 'Haskell', icon: 'λ', color: '#5e5086', tier: 'concept' },
  { id: 'lua', name: 'Lua', nameEn: 'Lua', icon: '🌙', color: '#000080', tier: 'concept' },
  { id: 'perl', name: 'Perl', nameEn: 'Perl', icon: '🐪', color: '#39457e', tier: 'concept' },
  { id: 'julia', name: 'Julia', nameEn: 'Julia', icon: '🔴', color: '#4063d8', tier: 'concept' },
  { id: 'sql', name: 'SQL', nameEn: 'SQL', icon: '🗄️', color: '#cc2927', tier: 'concept' },
  { id: 'bash', name: 'Bash', nameEn: 'Bash', icon: '🖥️', color: '#3e474a', tier: 'concept' },
  { id: 'html', name: 'HTML', nameEn: 'HTML', icon: '🌐', color: '#e34f26', tier: 'concept' },
  { id: 'css', name: 'CSS', nameEn: 'CSS', icon: '🎨', color: '#1572b6', tier: 'concept' },
]

export const LANG_CATEGORIES: { label: string; labelEn: string; icon: string; langIds: Language[] }[] = [
  { label: 'Popüler', labelEn: 'Popular', icon: '🔥', langIds: ['javascript', 'python', 'java', 'typescript', 'csharp', 'go', 'rust'] },
  { label: 'Web', labelEn: 'Web', icon: '🌐', langIds: ['html', 'css', 'php', 'bash', 'sql'] },
  { label: 'Sistem', labelEn: 'System', icon: '⚙️', langIds: ['c', 'cpp', 'rust'] },
  { label: 'Mobil', labelEn: 'Mobile', icon: '📱', langIds: ['kotlin', 'swift', 'dart'] },
  { label: 'Veri', labelEn: 'Data', icon: '📊', langIds: ['r', 'julia', 'sql', 'python'] },
  { label: 'Diğer', labelEn: 'Other', icon: '🧩', langIds: ['ruby', 'scala', 'haskell', 'lua', 'perl'] },
]

export type View = 'map' | 'challenge' | 'boss' | 'skillTree' | 'payment' | 'leaderboard' | 'profile'

export interface GameProgress {
  completedChallenges: string[]
  completedBosses: string[]
  currentSection: number
  ownedSkills: string[]
  skillPoints: number
  bossHp: number
  bossMaxHp: number
  bossStage: number
  xp: number
  hearts: number
  streak: number
  lastActiveDate: string | null
  coins: number
  adRevenue: number
  adsEnabled: boolean
  isVIP: boolean
  heartsUnlimited: boolean
}

interface GameState {
  view: View
  currentChallengeId: string | null
  currentBossId: string | null
  progress: GameProgress
  isPaid: boolean
  token: string | null
  username: string | null
  preferredLanguage: Language
  uiLanguage: UiLanguage
  setUiLanguage: (lang: UiLanguage) => void
  setView: (view: View) => void
  startChallenge: (id: string) => void
  startBoss: (id: string) => void
  completeChallenge: (id: string) => void
  completeBossStage: () => void
  completeBoss: () => void
  takeBossDamage: () => void
  addSkillPoint: (points: number) => void
  buySkill: (id: string) => void
  useSkill: (effect: string) => boolean
  setPaid: (paid: boolean) => void
  resetProgress: () => void
  setAuth: (token: string, username: string) => void
  setLanguage: (lang: Language) => void
  logout: () => void
  addXp: (amount: number) => void
  deductHeart: () => boolean
  refillHearts: () => void
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  addAdRevenue: (amount: number) => void
  withdrawAdRevenue: (amount: number) => boolean
  buyHeartWithCoins: () => boolean
  setAdsEnabled: (enabled: boolean) => void
  setVIP: (vip: boolean) => void
  setHeartsUnlimited: (unlimited: boolean) => void
  firebaseUser: FirebaseUser | null
  displayName: string
  photoURL: string
  email: string
  setFirebaseUser: (user: FirebaseUser | null) => void
}

const defaultProgress: GameProgress = {
  completedChallenges: [],
  completedBosses: [],
  currentSection: 0,
  ownedSkills: [],
  skillPoints: 0,
  bossHp: 3,
  bossMaxHp: 3,
  bossStage: 0,
  xp: 0,
  hearts: 5,
  streak: 0,
  lastActiveDate: null,
  coins: 0,
  adRevenue: 0,
  adsEnabled: true,
  isVIP: false,
  heartsUnlimited: false,
}

const GameContext = createContext<GameState | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('map')
  const [currentChallengeId, setCurrentChallengeId] = useState<string | null>(null)
  const [currentBossId, setCurrentBossId] = useState<string | null>(null)
  const [isPaid, setIsPaid] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [preferredLanguage, setPreferredLanguage] = useState<Language>('javascript')
  const [uiLanguage, setUiLanguageState] = useState<UiLanguage>('tr')
  const [progress, setProgress] = useState<GameProgress>(defaultProgress)

  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('codecrafter_progress')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setProgress({ ...defaultProgress, ...parsed })
      } catch { }
    }
    const paid = localStorage.getItem('codecrafter_paid')
    if (paid === 'true') setIsPaid(true)
    const savedToken = localStorage.getItem('codecrafter_token')
    const savedUsername = localStorage.getItem('codecrafter_username')
    if (savedToken && savedUsername) {
      setToken(savedToken)
      setUsername(savedUsername)
    }

    const savedFirebaseUser = localStorage.getItem('codecrafter_firebase_user')
    if (savedFirebaseUser) {
      try {
        const fu = JSON.parse(savedFirebaseUser)
        setFirebaseUser(fu)
        setDisplayName(fu.displayName)
        setPhotoURL(fu.photoURL)
        setEmail(fu.email)
      } catch {}
    }

    const savedLang = localStorage.getItem('codecrafter_language') as Language | null
    if (savedLang) {
      setPreferredLanguage(savedLang)
    }
    const savedUiLang = localStorage.getItem('codecrafter_ui_language') as UiLanguage | null
    if (['tr','en','es','fr','de','it','pt','ru','ar','zh','ja','ko','nl','pl','sv','el','hi'].includes(savedUiLang || '')) {
      setUiLanguageState(savedUiLang!)
    }

    // Auto-guest username
    if (!savedUsername) {
      const guests = ['CodeCoder', 'ByteBoss', 'SyntaxHero', 'DevDragon', 'PixelPirate', 'LogicLord', 'CipherSamurai', 'DataWizard', 'QueryQueen', 'NullNinja']
      const guestName = guests[Math.floor(Math.random() * guests.length)] + Math.floor(Math.random() * 100)
      setUsername(guestName)
      localStorage.setItem('codecrafter_username', guestName)
    }

    // Firebase auth state listener (auto-restore session)
    const unsub = onAuthChange(firebaseUser => {
      if (firebaseUser) {
        const fu = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL || '',
        }
        setFirebaseUser(fu)
        setDisplayName(fu.displayName)
        setPhotoURL(fu.photoURL)
        setEmail(fu.email)
        if (fu.displayName) {
          setUsername(fu.displayName)
          localStorage.setItem('codecrafter_username', fu.displayName)
        }
        localStorage.setItem('codecrafter_firebase_user', JSON.stringify(fu))
      }
    })

    // Check Streak
    setProgress(p => {
      const today = new Date().toISOString().split('T')[0]
      if (p.lastActiveDate === today) return p
      if (!p.lastActiveDate) return { ...p, streak: 1, lastActiveDate: today }
      
      const last = new Date(p.lastActiveDate)
      const curr = new Date(today)
      const diffTime = Math.abs(curr.getTime() - last.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) {
        return { ...p, streak: (p.streak || 0) + 1, lastActiveDate: today }
      } else {
        return { ...p, streak: 1, lastActiveDate: today }
      }
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('codecrafter_progress', JSON.stringify(progress))
  }, [progress])

  const startChallenge = useCallback((id: string) => {
    setCurrentChallengeId(id)
    setView('challenge')
  }, [])

  const startBoss = useCallback((id: string) => {
    setCurrentBossId(id)
    setProgress(p => ({ ...p, bossHp: 3, bossMaxHp: 3, bossStage: 0 }))
    setView('boss')
  }, [])

  const completeChallenge = useCallback((id: string) => {
    setProgress(p => ({
      ...p,
      completedChallenges: [...new Set([...p.completedChallenges, id])]
    }))
    setView('map')
  }, [])

  const completeBossStage = useCallback(() => {
    setProgress(p => ({ ...p, bossStage: p.bossStage + 1, bossHp: 3 }))
  }, [])

  const completeBoss = useCallback(() => {
    setProgress(p => ({
      ...p,
      completedBosses: [...new Set([...p.completedBosses, currentBossId || ''])],
      skillPoints: p.skillPoints + 1,
      currentSection: p.currentSection + 1,
    }))
    setCurrentBossId(null)
    setView('map')
  }, [currentBossId])

  const takeBossDamage = useCallback(() => {
    setProgress(p => {
      const newHp = p.bossHp - 1
      if (newHp <= 0) {
        return { ...p, bossHp: 0 }
      }
      return { ...p, bossHp: newHp }
    })
  }, [])

  const addSkillPoint = useCallback((points: number) => {
    setProgress(p => ({ ...p, skillPoints: p.skillPoints + points }))
  }, [])

  const buySkill = useCallback((id: string) => {
    setProgress(p => {
      if (p.ownedSkills.includes(id)) return p
      return {
        ...p,
        ownedSkills: [...p.ownedSkills, id],
        skillPoints: p.skillPoints - 1,
      }
    })
  }, [])

  const useSkill = useCallback((effect: string): boolean => {
    return true
  }, [])

  const setPaid = useCallback((paid: boolean) => {
    setIsPaid(paid)
    localStorage.setItem('codecrafter_paid', paid ? 'true' : 'false')
  }, [])

  const setAuth = useCallback((t: string, u: string) => {
    setToken(t)
    setUsername(u)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUsername(null)
    setFirebaseUser(null)
    setDisplayName('')
    setPhotoURL('')
    setEmail('')
    localStorage.removeItem('codecrafter_token')
    localStorage.removeItem('codecrafter_username')
    localStorage.removeItem('codecrafter_firebase_user')
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress)
    localStorage.removeItem('codecrafter_progress')
  }, [])

  const addXp = useCallback((amount: number) => {
    setProgress(p => ({ ...p, xp: p.xp + amount }))
  }, [])

  const deductHeart = useCallback(() => {
    let survived = true
    setProgress(p => {
      if (p.hearts <= 0) {
        survived = false
        return p
      }
      survived = p.hearts > 1
      return { ...p, hearts: p.hearts - 1 }
    })
    return survived
  }, [])

  const refillHearts = useCallback(() => {
    setProgress(p => ({ ...p, hearts: 5 }))
  }, [])

  const addCoins = useCallback((amount: number) => {
    setProgress(p => ({ ...p, coins: p.coins + amount }))
  }, [])

  const spendCoins = useCallback((amount: number) => {
    let success = false
    setProgress(p => {
      if (p.coins >= amount) {
        success = true
        return { ...p, coins: p.coins - amount }
      }
      success = false
      return p
    })
    return success
  }, [])

  const addAdRevenue = useCallback((amount: number) => {
    setProgress(p => ({ ...p, adRevenue: p.adRevenue + amount }))
  }, [])

  const withdrawAdRevenue = useCallback((amount: number) => {
    let success = false
    setProgress(p => {
      if (p.adRevenue >= amount) {
        success = true
        return { ...p, adRevenue: p.adRevenue - amount }
      }
      success = false
      return p
    })
    return success
  }, [])

  const buyHeartWithCoins = useCallback(() => {
    let success = false
    setProgress(p => {
      if (p.coins >= 2 && p.hearts < 5) {
        success = true
        return { ...p, coins: p.coins - 2, hearts: p.hearts + 1 }
      }
      success = false
      return p
    })
    return success
  }, [])

  const setAdsEnabled = useCallback((enabled: boolean) => {
    setProgress(p => ({ ...p, adsEnabled: enabled }))
  }, [])

  const setVIP = useCallback((vip: boolean) => {
    setProgress(p => ({ ...p, isVIP: vip, adsEnabled: !vip ? p.adsEnabled : false, heartsUnlimited: vip ? true : p.heartsUnlimited }))
  }, [])

  const setHeartsUnlimited = useCallback((unlimited: boolean) => {
    setProgress(p => ({ ...p, heartsUnlimited: unlimited }))
  }, [])

  const handleSetFirebaseUser = useCallback((user: FirebaseUser | null) => {
    setFirebaseUser(user)
    if (user) {
      setDisplayName(user.displayName)
      setPhotoURL(user.photoURL)
      setEmail(user.email)
      if (user.displayName) {
        setUsername(user.displayName)
        localStorage.setItem('codecrafter_username', user.displayName)
      }
      localStorage.setItem('codecrafter_firebase_user', JSON.stringify(user))
    } else {
      setDisplayName('')
      setPhotoURL('')
      setEmail('')
      localStorage.removeItem('codecrafter_firebase_user')
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setPreferredLanguage(lang)
    localStorage.setItem('codecrafter_language', lang)
  }, [])

  const setUiLanguage = useCallback((lang: UiLanguage) => {
    setUiLanguageState(lang)
    localStorage.setItem('codecrafter_ui_language', lang)
  }, [])

  return (
    <GameContext.Provider value={{
      view, currentChallengeId, currentBossId, progress, isPaid, token, username, preferredLanguage, uiLanguage,
      setUiLanguage, setView, startChallenge, startBoss, completeChallenge,
      completeBossStage, completeBoss, takeBossDamage,
      addSkillPoint, buySkill, useSkill, setPaid, resetProgress, setAuth, logout,
      addXp, deductHeart, refillHearts, setLanguage,
      addCoins, spendCoins, addAdRevenue, withdrawAdRevenue, buyHeartWithCoins, setAdsEnabled, setVIP, setHeartsUnlimited,
      firebaseUser, displayName, photoURL, email, setFirebaseUser: handleSetFirebaseUser,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
