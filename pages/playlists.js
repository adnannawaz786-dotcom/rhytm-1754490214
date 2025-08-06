import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Music, MoreHorizontal, Play, Heart } from 'lucide-react'
import { usePlayer } from '../contexts/PlayerContext'
import LoadingSkeleton from '../components/LoadingSkeleton'
import CreatePlaylistModal from '../components/CreatePlaylistModal'
import { Button } from '../components/ui/button'

export default function Playlists() {
  const { playlist, playTrack } = usePlayer()
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      name: 'Favorites',
      trackCount: 12,
      image: 'gradient-1',
      description: 'Your most loved tracks'
    },
    {
      id: 2,
      name: 'Chill Vibes',
      trackCount: 8,
      image: 'gradient-2',
      description: 'Perfect for relaxing'
    },
    {
      id: 3,
      name: 'Workout Mix',
      trackCount: 15,
      image: 'gradient-3',
      description: 'High energy tracks'
    },
    {
      id: 4,
      name: 'Road Trip',
      trackCount: 20,
      image: 'gradient-4',
      description: 'Best driving songs'
    }
  ])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const gradientStyles = {
    'gradient-1': 'from-pink-500 to-purple-600',
    'gradient-2': 'from-blue-500 to-teal-500',
    'gradient-3': 'from-orange-500 to-red-500',
    'gradient-4': 'from-green-500 to-blue-500'
  }

  const handleCreatePlaylist = (playlistData) => {
    const newPlaylist = {
      id: Date.now(),
      trackCount: 0,
      image: `gradient-${Math.floor(Math.random() * 4) + 1}`,
      ...playlistData
    }
    setPlaylists([...playlists, newPlaylist])
    setShowCreateModal(false)
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Your Playlists</h1>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-white/20 hover:bg-white/30 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Playlist
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          className="glassmorphism-card p-4 cursor-pointer hover:scale-105 transition-transform"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Liked Songs</h3>
              <p className="text-white/70 text-sm">25 songs</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="glassmorphism-card p-4 cursor-pointer hover:scale-105 transition-transform"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Recently Added</h3>
              <p className="text-white/70 text-sm">8 songs</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Playlists Grid */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Made by You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playlists.map((playlistItem, index) => (
            <motion.div
              key={playlistItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism-card p-6 cursor-pointer group hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-20 h-20 bg-gradient-to-br ${gradientStyles[playlistItem.image]} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Music className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{playlistItem.name}</h3>
                  <p className="text-white/70 text-sm mb-2">{playlistItem.description}</p>
                  <p className="text-white/50 text-sm">{playlistItem.trackCount} songs</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button 
                    size="sm" 
                    className="bg-white/20 hover:bg-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recently Played Playlists */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Recently Played</h2>
        <div className="space-y-3">
          {playlists.slice(0, 3).map((playlistItem, index) => (
            <motion.div
              key={`recent-${playlistItem.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism p-4 rounded-lg flex items-center space-x-4 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${gradientStyles[playlistItem.image]} rounded-lg flex items-center justify-center`}>
                <Music className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{playlistItem.name}</h3>
                <p className="text-white/70 text-sm">{playlistItem.trackCount} songs</p>
              </div>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                <Play className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Playlist Modal */}
      <CreatePlaylistModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePlaylist={handleCreatePlaylist}
      />
    </motion.div>
  )
}