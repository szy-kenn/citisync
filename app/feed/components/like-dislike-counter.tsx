'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface LikeDislikeCounterProps {
  initialLikes?: number
}

export function LikeDislikeCounter({ initialLikes = 0 }: LikeDislikeCounterProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null)

  const handleLike = () => {
    if (userAction === 'like') {
      setLikes(likes - 1)
      setUserAction(null)
    } else {
      setLikes(userAction === 'dislike' ? likes + 2 : likes + 1)
      setUserAction('like')
    }
  }

  const handleDislike = () => {
    if (userAction === 'dislike') {
      setLikes(likes + 1)
      setUserAction(null)
    } else {
      setLikes(userAction === 'like' ? likes - 2 : likes - 1)
      setUserAction('dislike')
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleLike}
        className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${
          userAction === 'like' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
        }`}
        aria-label="Like"
      >
        <ThumbsUp className="w-4 h-4" />
      </motion.button>
      
      <motion.span
        key={likes}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-md font-bold"
      >
        {likes}
      </motion.span>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleDislike}
        className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${
          userAction === 'dislike' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
        }`}
        aria-label="Dislike"
      >
        <ThumbsDown className="w-4 h-4" />
      </motion.button>
    </div>
  )
}

