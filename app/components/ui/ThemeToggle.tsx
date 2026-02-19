import { useTheme, type Theme } from '../../context/ThemeContext'

const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
  {
    value: 'light',
    label: 'Light',
    icon: (
      <svg
        width='15'
        height='15'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'>
        <circle cx='12' cy='12' r='4' />
        <path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41' />
      </svg>
    ),
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: (
      <svg
        width='15'
        height='15'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'>
        <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
      </svg>
    ),
  },
  {
    value: 'auto',
    label: 'Auto',
    icon: (
      <svg
        width='15'
        height='15'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'>
        <rect x='2' y='3' width='20' height='14' rx='2' />
        <path d='M8 21h8M12 17v4' />
      </svg>
    ),
  },
]

/**
 * ThemeToggle — 3-segment pill control for Light / Dark / Auto.
 * Single responsibility: render theme selection UI and call setTheme.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      role='group'
      aria-label='Theme'
      className='flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-0.5 gap-0.5'>
      {options.map((opt) => {
        const isActive = theme === opt.value
        return (
          <button
            key={opt.value}
            type='button'
            aria-pressed={isActive}
            title={opt.label}
            onClick={() => setTheme(opt.value)}
            className={[
              'flex items-center justify-center w-7 h-7 rounded-md text-sm transition-all',
              isActive
                ? 'bg-white dark:bg-slate-600 text-brand dark:text-brand-muted shadow-sm'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300',
            ].join(' ')}>
            {opt.icon}
            <span className='sr-only'>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
