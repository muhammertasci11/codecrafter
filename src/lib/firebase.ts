'use client'

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
}

const hasConfig = Boolean(firebaseConfig.apiKey)

export const app = hasConfig ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()) : null
export const auth = app ? getAuth(app) : null
export const googleProvider = app ? new GoogleAuthProvider() : null

export async function signInWithGoogle(): Promise<User | null> {
  if (!auth || !googleProvider) {
    alert('Firebase yapılandırması eksik. Lütfen Netlify panelinden (Site configuration > Environment variables) Firebase API anahtarlarını ekleyin.')
    return null
  }
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result.user
  } catch {
    return null
  }
}

export async function signOutUser(): Promise<void> {
  if (!auth) return
  await signOut(auth)
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  if (!auth) {
    return () => {}
  }
  return onAuthStateChanged(auth, callback)
}
