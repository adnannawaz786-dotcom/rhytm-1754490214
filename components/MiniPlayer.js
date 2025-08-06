import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, ChevronUp, ChevronDown, Heart, MoreHorizontal, Volume2, Repeat, Shuffle, X } from 'lucide-react'
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
    seekTo,
    volume,
    setVolume
  } = usePlayer()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

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

  const handleChevronClick = () => {
    if (isExpanded) {
      setIsFullScreen(true)
      setIsExpanded(false)
    } else {
      setIsExpanded(true)
    }
  }

  // Full Screen Player
  const FullScreenPlayer = () => (
    <AnimatePresence>
      {isFullScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 z-50 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-0">
            <Button 
              variant="ghost" 
              onClick={() => setIsFullScreen(false)}
              className="text-white hover:bg-white/10"
            >
              <ChevronDown className="w-6 h-6" />
            </Button>
            <div className="text-center">
              <h3 className="text-white/70 text-sm uppercase tracking-wide">Now Playing</h3>
            </div>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              <MoreHorizontal className="w-6 h-6" />
            </Button>
          </div>

          {/* Album Art */}
          <div className="flex-1 flex items-center justify-center p-8">
            <motion.div 
              className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-purple-400 via-blue-500 to-pink-500 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden"
              initial={{ scale: 0.8, rotateY: -15 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" 
              />
              <Play className="w-24 h-24 text-white/80" />
              
              {/* Animated vinyl record effect */}
              <motion.div 
                className="absolute inset-4 border-4 border-white/20 rounded-full"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
              >
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
              </motion.div>
            </motion.div>
          </div>

          {/* Track Info */}
          <div className="text-center px-8 mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentTrack.title}
            </motion.h1>
            <motion.p 
              className="text-xl text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentTrack.artist}
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="px-8 mb-6">
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

          {/* Main Controls */}
          <motion.div 
            className="flex items-center justify-center space-x-8 px-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              variant="ghost" 
              size="lg"
              className="text-white hover:bg-white/10"
            >
              <Shuffle className="w-6 h-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              onClick={previousTrack}
              className="text-white hover:bg-white/10"
            >
              <SkipBack className="w-8 h-8" />
            </Button>
            <Button 
              size="lg"
              onClick={togglePlayPause}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full w-20 h-20 backdrop-blur-md"
            >
              {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              onClick={nextTrack}
              className="text-white hover:bg-white/10"
            >
              <SkipForward className="w-8 h-8" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="text-white hover:bg-white/10"
            >
              <Repeat className="w-6 h-6" />
            </Button>
          </motion.div>

          {/* Secondary Controls */}
          <motion.div 
            className="flex items-center justify-between px-8 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              <Heart className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-white/70" />
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="w-24"
              />
              <span className="text-white/70 text-sm w-8">{volume}%</span>
            </div>
            
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
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
                  onClick={handleChevronClick}
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-center space-x-6 flex-1">
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
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setIsFullScreen(true)}
                      className="text-white hover:bg-white/10"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      <FullScreenPlayer />
    </>
  )
}