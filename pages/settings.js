import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, Moon, Sun, Download, Trash2, User, Bell, Shield } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { usePlayer } from '../contexts/PlayerContext'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { Button } from '../components/ui/button'
import { Switch } from '../components/ui/switch'
import { Slider } from '../components/ui/slider'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { volume, setVolume } = usePlayer()
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState({
    notifications: true,
    autoPlay: true,
    downloadQuality: 'high',
    crossfade: false,
    gaplessPlayback: true,
    showLyrics: true
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-32"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/70">Customize your music experience</p>
      </div>

      {/* Profile Section */}
      <motion.div 
        className="glassmorphism-card p-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Music Lover</h2>
            <p className="text-white/70">Premium User</p>
          </div>
        </div>
        <Button className="w-full bg-white/20 hover:bg-white/30 text-white">
          Edit Profile
        </Button>
      </motion.div>

      {/* Audio Settings */}
      <div className="glassmorphism-card p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Volume2 className="w-5 h-5 mr-2" />
          Audio Settings
        </h2>
        
        <div className="space-y-6">
          {/* Master Volume */}
          <div>
            <label className="block text-white font-medium mb-2">Master Volume</label>
            <div className="flex items-center space-x-4">
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-white text-sm w-12">{volume}%</span>
            </div>
          </div>

          {/* Audio Quality */}
          <div>
            <label className="block text-white font-medium mb-2">Audio Quality</label>
            <div className="grid grid-cols-3 gap-2">
              {['normal', 'high', 'lossless'].map((quality) => (
                <Button
                  key={quality}
                  variant={settings.downloadQuality === quality ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateSetting('downloadQuality', quality)}
                  className={settings.downloadQuality === quality ? '' : 'border-white/20 text-white hover:bg-white/10'}
                >
                  {quality.charAt(0).toUpperCase() + quality.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Toggle Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Crossfade</span>
              <Switch 
                checked={settings.crossfade} 
                onCheckedChange={(checked) => updateSetting('crossfade', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Gapless Playback</span>
              <Switch 
                checked={settings.gaplessPlayback} 
                onCheckedChange={(checked) => updateSetting('gaplessPlayback', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white">Auto-play Similar Tracks</span>
              <Switch 
                checked={settings.autoPlay} 
                onCheckedChange={(checked) => updateSetting('autoPlay', checked)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="glassmorphism-card p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          {theme === 'dark' ? <Moon className="w-5 h-5 mr-2" /> : <Sun className="w-5 h-5 mr-2" />}
          Appearance
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white font-medium">Dark Mode</span>
              <p className="text-white/70 text-sm">Toggle between light and dark themes</p>
            </div>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-white">Show Lyrics</span>
            <Switch 
              checked={settings.showLyrics} 
              onCheckedChange={(checked) => updateSetting('showLyrics', checked)}
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="glassmorphism-card p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white font-medium">Push Notifications</span>
              <p className="text-white/70 text-sm">Get notified about new releases</p>
            </div>
            <Switch 
              checked={settings.notifications} 
              onCheckedChange={(checked) => updateSetting('notifications', checked)}
            />
          </div>
        </div>
      </div>

      {/* Storage & Data */}
      <div className="glassmorphism-card p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Storage & Data
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white font-medium">Downloaded Music</span>
              <p className="text-white/70 text-sm">245 MB used</p>
            </div>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              Manage
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white font-medium">Cache</span>
              <p className="text-white/70 text-sm">89 MB used</p>
            </div>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="glassmorphism-card p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Privacy & Security
        </h2>
        
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
            Privacy Policy
          </Button>
          <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
            Terms of Service
          </Button>
          <Button variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
            Data Export
          </Button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="glassmorphism-card p-6">
        <div className="space-y-3">
          <Button variant="outline" className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
            Sign Out
          </Button>
          <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10">
            Delete Account
          </Button>
        </div>
      </div>
    </motion.div>
  )
}