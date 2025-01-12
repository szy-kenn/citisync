'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Comment } from '@/lib/types'

interface DebateDetailsProps {
  title: string
  content: string
  author: string
  createdAt: Date
  initialVotes: number
  initialComments: Comment[]
}

export function DebateDetails({
  title,
  content,
  author,
  createdAt,
  initialVotes,
  initialComments
}: DebateDetailsProps) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')

  const handleVote = (voteType: 'up' | 'down') => {
    if (userVote === voteType) {
      setVotes(votes + (voteType === 'up' ? -1 : 1))
      setUserVote(null)
    } else {
      setVotes(votes + (voteType === 'up' ? 1 : -1) + (userVote ? (userVote === 'up' ? -1 : 1) : 0))
      setUserVote(voteType)
    }
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        author: 'Current User', // In a real app, this would be the logged-in user
        content: newComment,
        timestamp: new Date().toISOString()
      }
      setComments([...comments, newCommentObj])
      setNewComment('')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>
            Proposed by {author} on {new Date(createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-lg">{content}</div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={userVote === 'up' ? 'default' : 'outline'}
              onClick={() => handleVote('up')}
              aria-label="Upvote"
            >
              <ChevronUp className="h-4 w-4 mr-1" />
            </Button>
            <span className="font-bold">{votes}</span>
            <Button
              size="sm"
              variant={userVote === 'down' ? 'default' : 'outline'}
              onClick={() => handleVote('down')}
              aria-label="Downvote"
            >
              <ChevronDown className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button type="submit">Post Comment</Button>
          </form>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar>
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

