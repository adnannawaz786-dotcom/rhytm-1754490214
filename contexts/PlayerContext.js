import { createContext, useContext, useState, useEffect, useRef } from 'react'

const PlayerContext = createContext()

const mockPlaylist = [
  {
    id: 1,
    title: 'Midnight Dreams',
    artist: 'Luna Wave',
    duration: '3:45',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 2,
    title: 'Electric Pulse',
    artist: 'Neon Lights',
    duration: '4:12',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 3,
    title: 'Ocean Breeze',
    artist: 'Coastal Sound',
    duration: '3:28',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 4,
    title: 'City Nights',
    artist: 'Urban Echo',
    duration: '4:01',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 5,
    title: 'Starlight',
    artist: 'Cosmic Vibes',
    duration: '3:56',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 6,
    title: 'Thunder Storm',
    artist: 'Nature Sounds',
    duration: '5:23',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 7,
    title: 'Golden Hour',
    artist: 'Sunset Collective',
    duration: '3:33',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 8,
    title: 'Digital Love',
    artist: 'Synth Masters',
    duration: '4:18',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 9,
    title: 'Mountain High',
    artist: 'Alpine Echoes',
    duration: '4:45',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 10,
    title: 'Neon Nights',
    artist: 'Retro Future',
    duration: '3:52',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
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
  const audioRef = useRef(null)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    const audio = audioRef.current

    // Audio event listeners
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      nextTrack()
    }

    const handleCanPlay = () => {
      if (isPlaying) {
        audio.play().catch(console.error)
      }
    }

    const handleError = (e) => {
      console.error('Audio error:', e)
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.pause()
    }
  }, [])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  const playTrack = (track) => {
    const audio = audioRef.current
    if (!audio) return

    // Set the new track
    setCurrentTrack(track)
    setCurrentTime(0)
    
    // Load the audio source
    audio.src = track.url
    audio.currentTime = 0
    
    // Find the index of the track
    const index = playlist.findIndex(t => t.id === track.id)
    setCurrentIndex(index)
    
    // Start playing
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    if (!currentTrack) {
      // If no track is selected, play the first track
      if (playlist.length > 0) {
        playTrack(playlist[0])
      }
      return
    }
    
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    if (playlist.length === 0) return
    
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % playlist.length : 0
    playTrack(playlist[nextIndex])
  }

  const previousTrack = () => {
    if (playlist.length === 0) return
    
    const prevIndex = currentIndex >= 0 ? 
      (currentIndex === 0 ? playlist.length - 1 : currentIndex - 1) : 0
    playTrack(playlist[prevIndex])
  }

  const seekTo = (time) => {
    if (audioRef.current && currentTrack) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const addToPlaylist = (track) => {
    setPlaylist(prev => [...prev, track])
  }

  const removeFromPlaylist = (trackId) => {
    setPlaylist(prev => prev.filter(t => t.id !== trackId))
    
    // If the current track is being removed, stop playback
    if (currentTrack && currentTrack.id === trackId) {
      setCurrentTrack(null)
      setIsPlaying(false)
      setCurrentIndex(-1)
    }
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
    seekTo,
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