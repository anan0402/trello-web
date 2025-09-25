const THEME_KEY = 'theme-preference'

export function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export function applyTheme(theme) {
  const next = theme === 'dark' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', next)
}

export function initTheme() {
  const theme = getPreferredTheme()
  applyTheme(theme)
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme')
  const next = current === 'dark' ? 'light' : 'dark'
  localStorage.setItem(THEME_KEY, next)
  applyTheme(next)
}

export function getThemeIcon() {
  const stored = localStorage.getItem(THEME_KEY)
  return stored
}
