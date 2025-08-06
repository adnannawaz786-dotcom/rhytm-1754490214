import { createContext, useContext, useState, useEffect } from 'react'

const PlayerContext = createContext()

const mockPlaylist = [
  {
    id: 1,
    title: 'Midnight Dreams',
    artist: 'Luna Wave',
    duration: '3:45',
    url: ''
  },
  {
    id: 2,
    title: 'Electric Pulse',
    artist: 'Neon Lights',
    duration: '4:12',
    url: ''
  },
  {
    id: 3,
    title: 'Ocean Breeze',
    artist: 'Coastal Sound',
    duration: '3:28',
    url: ''
  },
  {
    id: 4,
    title: 'City Nights',
    artist: 'Urban Echo',
    duration: '4:01',
    url: ''
  },
  {
    id: 5,
    title: 'Starlight',
    artist: 'Cosmic Vibes',
    duration: '3:56',
    url: ''
  },
  {
    id: 6,
    title: 'Thunder Storm',
    artist: 'Nature Sounds',
    duration: '5:23',
    url: ''
  },
  {
    id: 7,
    title: 'Golden Hour',
    artist: 'Sunset Collective',
    duration: '3:33',
    url: ''
  },
  {
    id: 8,
    title: 'Digital Love',
    artist: 'Synth Masters',
    duration: '4:18',
    url: ''
  },
  {
    id: 9,
    title: 'Mountain High',
    artist: 'Alpine Echoes',
    duration: '4:45',
    url: ''
  },
  {
    id: 10,
    title: 'Neon Nights',
    artist: 'Retro Future',
    duration: '3:52',
    url: ''
  }
]

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState(mockPlaylist)
  const [volume, setVolume] = useState(75)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(-1)

  // Simulate audio progress
  useEffect(() => {
    let interval
    if (isPlaying && currentTrack) {
      const trackDuration = parseDuration(currentTrack.duration)
      setDuration(trackDuration)
      
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= trackDuration - 1) {
            nextTrack()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTrack])

  const parseDuration = (durationStr) => {
    const [minutes, seconds] = durationStr.split(':').map(Number)
    return minutes * 60 + seconds
  }

  const playTrack = (track) => {
    setCurrentTrack(track)
    setCurrentTime(0)
    setIsPlaying(true)
    const index = playlist.findIndex(t => t.id === track.id)
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    const nextIndex = (currentIndex + 1) % playlist.length
    playTrack(playlist[nextIndex])
  }

  const previousTrack = () => {
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    playTrack(playlist[prevIndex])
  }

  const addToPlaylist = (track) => {
    setPlaylist(prev => [...prev, track])
  }

  const removeFromPlaylist = (trackId) => {
    setPlaylist(prev => prev.filter(t => t.id !== trackId))
  }

  const value = {
    currentTrack,
    isPlaying,
    playlist,
    volume,
    currentTime,
    duration,
    currentIndex,
    playTrack,
    togglePlayPause,
    nextTrack,
    previousTrack,
    setVolume,
    addToPlaylist,
    removeFromPlaylist
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}