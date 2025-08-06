import { motion } from 'framer-motion'
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

export default function TrackCard({ track, onPlay, isCurrentTrack, isPlaying }) {
  return (
    <motion.div 
      className="glassmorphism-card p-4 group hover:scale-105 transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onPlay}
    >
      <div className="aspect-square bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isPlaying && isCurrentTrack ? (
            <Pause className="w-12 h-12 text-white" />
          ) : (
            <Play className="w-12 h-12 text-white" />
          )}
        </motion.div>
        {isCurrentTrack && (
          <motion.div 
            className="absolute bottom-2 left-2 w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
          />
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-white text-sm truncate">
          {track.title}
        </h3>
        <p className="text-white/70 text-xs truncate">
          {track.artist}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-xs">
            {track.duration}
          </span>
          <div className="flex space-x-1">
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Heart className="w-3 h-3" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}