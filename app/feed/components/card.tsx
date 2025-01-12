'use client'

import { Post } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MapPin, AlertTriangle, ThumbsUp, ThumbsDown } from 'lucide-react'
import { formatTimestamp } from "@/lib/utils"
import Link from "next/link"
import { LikeDislikeCounter } from "./like-dislike-counter"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PostCardProps {
  post: Post
  isShortened?: boolean
}

export default function PostCard({ post, isShortened = false }: PostCardProps) {
  const formattedDate = formatTimestamp(post.createdAt)

  return (
    <Card className="max-w-md transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br from-white to-gray-50 border border-gray-200">
      <Link href={`/posts/${post.id}`} className="block h-full">
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{post.user.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.user}</p>
              <p className="text-xs text-muted-foreground">{formattedDate}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {post.isResolved ? (
                    <Badge variant="success">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Resolved
                    </Badge>
                  ) : (
                    <Badge variant="warning">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Pending
                    </Badge>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {post.isResolved ? "This issue has been resolved" : "This issue is still pending"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Badge variant="destructive">
              {post.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-lg">{post.title}</h3>
          {!isShortened && post.image_url && (
            <img
              src={post.image_url}
              className="rounded-md w-full h-48 object-cover"
              alt="Post image"
            />
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
          <LikeDislikeCounter initialLikes={post.likes} />
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{post.location}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
