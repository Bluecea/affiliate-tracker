import { useAuth } from '../../context/AuthContext'
import { Button } from '../ui/button'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LogOut, User } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, signOut } = useAuth()

  return (
    <header className='flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-6'>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden -ml-2'
          onClick={onMenuClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-6 w-6'>
            <line x1='4' x2='20' y1='12' y2='12' />
            <line x1='4' x2='20' y1='6' y2='6' />
            <line x1='4' x2='20' y1='18' y2='18' />
          </svg>
          <span className='sr-only'>Open menu</span>
        </Button>
      </div>

      <div className='flex items-center gap-3'>
        {/* Theme toggle */}
        <ThemeToggle />

        {/* User identity */}
        <div className='flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800'>
            <User className='h-4 w-4 text-slate-500 dark:text-slate-400' />
          </div>
          <span className='hidden sm:inline-block font-medium'>
            {user?.user_metadata?.full_name || user?.email}
          </span>
        </div>

        <Button
          variant='ghost'
          size='sm'
          onClick={signOut}
          title='Sign out'
          className='text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'>
          <LogOut className='h-4 w-4' />
          <span className='sr-only'>Sign out</span>
        </Button>
      </div>
    </header>
  )
}
