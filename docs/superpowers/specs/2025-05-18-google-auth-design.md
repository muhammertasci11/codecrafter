# Phase 2: Google Auth + Hesabım Sistemi

## Stack
- **Firebase Authentication** (Google provider + email/şifre + anonymous)
- **firebase** npm package (v11+)
- **Next.js API routes** for token verification and user data

## Architecture

### Auth Flow
1. **First launch**: Anonymous Firebase account created, random username generated, stored in localStorage
2. **Google Sign-In**: Firebase `signInWithPopup(GoogleAuthProvider)`, links to anonymous account
3. **Subsequent visits**: `onAuthStateChanged` auto-restores session, no login prompt
4. **Firebase token** stored as `codecrafter_token` in localStorage (replacing current simple base64 token)

### Data Model
- Firebase Auth UID = primary user identifier
- Backend users table: `id` (uid), `username`, `email`, `photoURL`, `createdAt`, `lastLoginAt`
- Progress stored same as before (JSON in Turso DB), keyed by Firebase UID

### Components
- `HesabimModal.tsx` — Profile + Stats + Settings modal
  - Profile section: avatar, name, email, edit button
  - Stats: level, XP, coins, challenges completed, bosses defeated, streak, premium status
  - Settings: game language, UI language, theme
  - Logout button
- Auth state managed in `GameProvider` (new fields: `user`, `isAnonymous`, `photoURL`)

### Firebase Config
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```
