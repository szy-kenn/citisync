'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from 'lucide-react'

interface ProposalCardProps {
  title: string
  content: string
  initialVotes?: number
  handleSelect?: () => void
}

export function ProposalCard({ title, content, initialVotes = 0, handleSelect }: ProposalCardProps) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)

  const handleVote = (voteType: 'up' | 'down') => {
    if (userVote === voteType) {
      setVotes(votes + (voteType === 'up' ? -1 : 1))
      setUserVote(null)
    } else {
      setVotes(votes + (voteType === 'up' ? 1 : -1) + (userVote ? (userVote === 'up' ? -1 : 1) : 0))
      setUserVote(voteType)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="relative max-h-24 overflow-hidden">
            {content}
            <span className="absolute bottom-0 right-0 left-0 h-12 bg-gradient-to-t from-background to-transparent"></span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={userVote === 'up' ? 'default' : 'outline'}
              onClick={() => handleVote('up')}
              aria-label="Upvote"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <span className="font-bold">{votes}</span>
            <Button
              size="sm"
              variant={userVote === 'down' ? 'default' : 'outline'}
              onClick={() => handleVote('down')}
              aria-label="Downvote"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="link" onClick={handleSelect}>Read More</Button>
        </div>
      </CardContent>
    </Card>
  )
}

