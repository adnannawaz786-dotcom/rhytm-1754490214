import { useRouter } from 'next/router'
import { Home, Library, ListMusic, Settings, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MiniPlayer from './MiniPlayer'
import { Button } from './ui/button'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/library', icon: Library, label: 'Library' },
  { href: '/playlists', icon: ListMusic, label: 'Playlists' },
  { href: '/settings', icon: Settings, label: 'Settings' }
]

export default function Layout({ children }) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActivePath = (path) => {
    if (path === '/') {
      return router.pathname === '/'
    }
    return router.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <nav className="fixed left-0 top-0 h-full w-64 glassmorphism-card p-6 z-40">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white">RhythmWave</h1>
              <p className="text-white/60 text-sm">Your Music Universe</p>
            </div>

            {/* Navigation */}
            <div className="flex-1">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = isActivePath(item.href)
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/20 text-white shadow-lg' 
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-6 border-t border-white/10">
              <p className="text-white/50 text-xs text-center">
                Made using PantheraBuilder
              </p>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 h-16 glassmorphism-card flex items-center justify-between px-4 z-50">
          <h1 className="text-xl font-bold text-white">RhythmWave</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-white/10"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="fixed top-16 left-0 right-0 glassmorphism-card z-40 m-4 rounded-xl"
            >
              <div className="p-4">
                {navItems.map((item) => {
                  const isActive = isActivePath(item.href)
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Main Content */}
        <main className="pt-20 pb-32 px-4">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 glassmorphism-card z-50">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const isActive = isActivePath(item.href)
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.a>
              )
            })}
          </div>
        </nav>

        {/* Footer for mobile */}
        <div className="fixed bottom-20 left-0 right-0 z-40">
          <p className="text-white/30 text-xs text-center py-2">
            Made using PantheraBuilder
          </p>
        </div>
      </div>

      {/* Mini Player */}
      <MiniPlayer />
    </div>
  )
}