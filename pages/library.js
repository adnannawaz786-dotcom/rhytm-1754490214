import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, Upload } from 'lucide-react'
import { usePlayer } from '../contexts/PlayerContext'
import TrackCard from '../components/TrackCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import FileUploader from '../components/FileUploader'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function Library() {
  const { playlist, playTrack, currentTrack, isPlaying } = usePlayer()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [showUploader, setShowUploader] = useState(false)
  const [filteredTracks, setFilteredTracks] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const filtered = playlist.filter(track =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredTracks(filtered)
  }, [searchQuery, playlist])

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
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Your Library</h1>
          <Button 
            onClick={() => setShowUploader(true)}
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <Input 
              placeholder="Search your music..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? '' : 'text-white hover:bg-white/10'}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? '' : 'text-white hover:bg-white/10'}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* File Uploader */}
      {showUploader && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glassmorphism-card p-6"
        >
          <FileUploader onClose={() => setShowUploader(false)} />
        </motion.div>
      )}

      {/* Stats */}
      <div className="glassmorphism p-6 rounded-xl">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-white">{playlist.length}</p>
            <p className="text-white/70 text-sm">Total Tracks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{new Set(playlist.map(t => t.artist)).size}</p>
            <p className="text-white/70 text-sm">Artists</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">2.5h</p>
            <p className="text-white/70 text-sm">Total Time</p>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          {searchQuery ? `Search Results (${filteredTracks.length})` : `All Tracks (${playlist.length})`}
        </h2>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
        ) : (
          <div className="space-y-2">
            {filteredTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="glassmorphism p-4 rounded-lg flex items-center space-x-4 hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => playTrack(track)}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{track.title}</h3>
                  <p className="text-white/70 text-sm">{track.artist}</p>
                </div>
                <div className="text-white/70 text-sm">
                  {track.duration}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {filteredTracks.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No tracks found</h3>
          <p className="text-white/70">Try adjusting your search terms</p>
        </div>
      )}
    </motion.div>
  )
}