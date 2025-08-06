import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, ChevronUp, Heart } from 'lucide-react'
import { usePlayer } from '../contexts/PlayerContext'
import { Button } from './ui/button'
import { Slider } from './ui/slider'

export default function MiniPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlayPause, 
    nextTrack, 
    previousTrack,
    currentTime,
    duration,
    seekTo
  } = usePlayer()
  const [isExpanded, setIsExpanded] = useState(false)

  if (!currentTrack) return null

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const clickPercent = clickX / width
    const newTime = clickPercent * duration
    seekTo(newTime)
  }

  const handleSliderChange = (value) => {
    seekTo(value[0])
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-16 md:bottom-4 left-4 right-4 md:left-80 md:right-4 z-30"
      >
        <motion.div 
          className="glassmorphism-card p-4 rounded-xl overflow-hidden"
          layout
        >
          {/* Progress Bar */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 bg-white/10 cursor-pointer"
            onClick={handleProgressClick}
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Mini Player Content */}
          <motion.div 
            className="flex items-center space-x-4"
            layout
          >
            {/* Track Info */}
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white text-sm truncate">
                  {currentTrack.title}
                </h3>
                <p className="text-white/70 text-xs truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={previousTrack}
                className="text-white hover:bg-white/10 hidden sm:flex"
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                onClick={togglePlayPause}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={nextTrack}
                className="text-white hover:bg-white/10 hidden sm:flex"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-white hover:bg-white/10 hidden sm:flex"
              >
                <Heart className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white hover:bg-white/10"
              >
                <ChevronUp className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </motion.div>

          {/* Expanded View */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <div className="mb-3">
                  <Slider
                    value={[currentTime]}
                    onValueChange={handleSliderChange}
                    max={duration || 100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-white/70 text-sm mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-6">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={previousTrack}
                    className="text-white hover:bg-white/10"
                  >
                    <SkipBack className="w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    onClick={togglePlayPause}
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full w-12 h-12"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={nextTrack}
                    className="text-white hover:bg-white/10"
                  >
                    <SkipForward className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}