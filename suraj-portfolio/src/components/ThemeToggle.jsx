import { motion } from 'framer-motion'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className="group relative inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-500 hover:border-red-500/60 hover:shadow-red-500/20 dark:bg-black/40 dark:text-white"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -30, scale: 0.8, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="flex items-center"
      >
        {isDark ? <FaSun className="text-amber-400" /> : <FaMoon className="text-red-500" />}
      </motion.span>
      <span className="hidden sm:inline">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </motion.button>
  )
}
