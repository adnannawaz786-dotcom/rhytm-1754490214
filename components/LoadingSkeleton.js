import { motion } from 'framer-motion'

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6 pb-32">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <motion.div 
          className="h-8 bg-white/10 rounded-lg w-1/3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="h-4 bg-white/10 rounded-lg w-1/2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        />
      </div>

      {/* Main Card Skeleton */}
      <motion.div 
        className="glassmorphism-card p-6 space-y-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/10 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/10 rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-white/10 rounded" />
          <div className="flex justify-between">
            <div className="h-3 bg-white/10 rounded w-12" />
            <div className="h-3 bg-white/10 rounded w-12" />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-6">
          <div className="w-8 h-8 bg-white/10 rounded-full" />
          <div className="w-12 h-12 bg-white/10 rounded-full" />
          <div className="w-8 h-8 bg-white/10 rounded-full" />
        </div>
      </motion.div>

      {/* Grid Skeleton */}
      <div className="space-y-4">
        <motion.div 
          className="h-6 bg-white/10 rounded w-1/4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i}
              className="glassmorphism-card p-4 space-y-3"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.8 + i * 0.1 }}
            >
              <div className="aspect-square bg-white/10 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-white/10 rounded w-12" />
                  <div className="flex space-x-1">
                    <div className="w-6 h-6 bg-white/10 rounded" />
                    <div className="w-6 h-6 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* List Skeleton */}
      <div className="space-y-4">
        <motion.div 
          className="h-6 bg-white/10 rounded w-1/4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
        />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className="glassmorphism p-4 rounded-lg flex items-center space-x-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.4 + i * 0.1 }}
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-2/3" />
                <div className="h-3 bg-white/10 rounded w-1/3" />
              </div>
              <div className="h-3 bg-white/10 rounded w-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}