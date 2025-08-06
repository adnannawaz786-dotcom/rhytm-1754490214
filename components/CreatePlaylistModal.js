import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Music } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

export default function CreatePlaylistModal({ isOpen, onClose, onCreatePlaylist }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onCreatePlaylist({
      name: name.trim(),
      description: description.trim()
    })
    
    setName('')
    setDescription('')
    setIsSubmitting(false)
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setName('')
      setDescription('')
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="backdrop-blur-md bg-white/20 dark:bg-black/30 border border-white/30 shadow-lg rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Create Playlist</h2>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClose}
                disabled={isSubmitting}
                className="text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  Playlist Name *
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter playlist name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Description
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your playlist (optional)"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  type="submit" 
                  disabled={!name.trim() || isSubmitting}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Playlist'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}