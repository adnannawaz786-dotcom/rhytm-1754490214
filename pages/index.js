import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, MoreHorizontal } from 'lucide-react'
import { usePlayer } from '../contexts/PlayerContext'
import TrackCard from '../components/TrackCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { Button } from '../components/ui/button'
import { Slider } from '../components/ui/slider'

export default function Home() {
  const { 
    currentTrack, 
    isPlaying, 
    playlist, 
    playTrack, 
    togglePlayPause, 
    nextTrack, 
    previousTrack,
    volume,
    setVolume,
    currentTime,
    duration
  } = usePlayer()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-32"
    >
      {/* Current Playing Section */}
      {currentTrack && (
        <motion.div 
          className="glassmorphism-card p-6"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">{currentTrack.title}</h2>
              <p className="text-white/70">{currentTrack.artist}</p>
            </div>
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-white/70 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6 mb-4">
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
              className="bg-white/20 hover:bg-white/30 text-white rounded-full w-14 h-14"
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

          {/* Volume */}
          <div className="flex items-center space-x-3">
            <Volume2 className="w-4 h-4 text-white/70" />
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-white/70 w-8">{volume}%</span>
          </div>
        </motion.div>
      )}

      {/* Recently Played */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Recently Played</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playlist.slice(0, 4).map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TrackCard 
                track={track} 
                onPlay={() => playTrack(track)}
                isCurrentTrack={currentTrack?.id === track.id}
                isPlaying={isPlaying && currentTrack?.id === track.id}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Tracks */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Popular Tracks</h2>
        <div className="space-y-3">
          {playlist.slice(4, 8).map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism p-4 rounded-lg flex items-center space-x-4 hover:bg-white/20 transition-colors cursor-pointer"
              onClick={() => playTrack(track)}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                {isPlaying && currentTrack?.id === track.id ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{track.title}</h3>
                <p className="text-white/70 text-sm">{track.artist}</p>
              </div>
              <div className="text-white/70 text-sm">
                {track.duration}
              </div>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}