import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, File, Check, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { usePlayer } from '../contexts/PlayerContext'

export default function FileUploader({ onClose }) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const { addToPlaylist } = usePlayer()
  const inputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList) => {
    const validFiles = Array.from(fileList).filter(file => 
      file.type.startsWith('audio/') || file.name.endsWith('.mp3')
    )
    setFiles(validFiles.map(file => ({ file, status: 'pending' })))
  }

  const handleUpload = async () => {
    setUploading(true)
    
    // Simulate file processing
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      setFiles(prev => prev.map((f, idx) => 
        idx === i ? { ...f, status: 'uploading' } : f
      ))
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create mock track data
      const newTrack = {
        id: Date.now() + i,
        title: file.file.name.replace(/\.[^/.]+$/, ""),
        artist: 'Unknown Artist',
        duration: '3:45',
        url: URL.createObjectURL(file.file)
      }
      
      addToPlaylist(newTrack)
      
      setFiles(prev => prev.map((f, idx) => 
        idx === i ? { ...f, status: 'success' } : f
      ))
    }
    
    setUploading(false)
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Upload className="w-4 h-4" /></motion.div>
      case 'success':
        return <Check className="w-4 h-4 text-green-400" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return <File className="w-4 h-4" />
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Upload Music</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Drop Zone */}
      <motion.div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive 
            ? 'border-blue-400 bg-blue-400/10' 
            : 'border-white/30 hover:border-white/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
      >
        <Upload className="w-12 h-12 text-white/70 mx-auto mb-4" />
        <h4 className="text-lg font-semibold text-white mb-2">
          Drag and drop your music files
        </h4>
        <p className="text-white/70 mb-4">
          or click to browse your computer
        </p>
        <Button 
          onClick={() => inputRef.current?.click()}
          className="bg-white/20 hover:bg-white/30 text-white"
        >
          Browse Files
        </Button>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="audio/*,.mp3"
          onChange={handleChange}
          className="hidden"
        />
      </motion.div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-white">Selected Files</h4>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {files.map((fileData, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
              >
                {getStatusIcon(fileData.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">
                    {fileData.file.name}
                  </p>
                  <p className="text-white/50 text-xs">
                    {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {fileData.status === 'pending' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                    className="text-white/50 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {files.length > 0 && (
        <div className="flex space-x-3">
          <Button 
            onClick={handleUpload}
            disabled={uploading || files.every(f => f.status !== 'pending')}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} File${files.length > 1 ? 's' : ''}`}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setFiles([])}
            disabled={uploading}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Clear
          </Button>
        </div>
      )}
    </motion.div>
  )
}