import type { ReactNode } from 'react'
import { AuthPanel } from './AuthPanel'

interface AuthLayoutProps {
  children: ReactNode
}

/**
 * AuthLayout — Two-column shell: brand panel on left, form content on right.
 * Single responsibility: layout structure for all auth pages.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <AuthPanel />
      <div className='flex flex-col items-center justify-center px-8 py-12 bg-white dark:bg-slate-950'>
        {children}
      </div>
    </div>
  )
}
