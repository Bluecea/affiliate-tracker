import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark' | 'auto'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = 'bluecea-theme'

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyDarkClass(resolved: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

function resolve(theme: Theme, systemPref: 'light' | 'dark'): 'light' | 'dark' {
  return theme === 'auto' ? systemPref : theme
}

/**
 * ThemeProvider — reads/persists theme preference, applies the `dark` class
 * to <html>, and listens to system preference changes when in "auto" mode.
 * Single responsibility: theme state management only.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'auto'
    return (localStorage.getItem(STORAGE_KEY) as Theme) ?? 'auto'
  })

  // Track system preference as reactive state so resolvedTheme stays accurate
  const [systemPref, setSystemPref] = useState<'light' | 'dark'>(
    getSystemPreference,
  )

  const resolvedTheme = resolve(theme, systemPref)

  // Apply .dark class whenever the resolved theme changes
  useEffect(() => {
    applyDarkClass(resolvedTheme)
  }, [resolvedTheme])

  // Keep systemPref in sync when OS preference changes (only meaningful in "auto")
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) =>
      setSystemPref(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next)
    setThemeState(next)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
