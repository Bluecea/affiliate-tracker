import { Button } from '../ui/button'
import { ThemeToggle } from '../ui/ThemeToggle'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
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
            className='h-6 w-6 text-slate-700 dark:text-slate-300'>
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
      </div>
    </header>
  )
}
