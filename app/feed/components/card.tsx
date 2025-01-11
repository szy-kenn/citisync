import { Post } from "@/lib/types";
import { Card } from "@/components/ui/card"
import { ThumbsUp, MapPin, ThumbsDown, TriangleAlert } from 'lucide-react'
import Image from "next/image"


interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="max-w-md p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10">
            <div className="flex justify-center items-center bg-slate-500 h-12 aspect-square rounded-full">D</div>
          </div>
          <div className="space-y-1">
            <div className="flex flex-col gap-1">
              <span className="font-medium">{post.user}</span>
              <div className="flex bg-red text-white justify-center items-center rounded-md px-4 py-1 text-sm gap-1">
                <TriangleAlert className="h-4 w-4" />
                {post.category}
              </div>
            </div>
          </div>
        </div>
        <div
            className={`font-normal mr-1 rounded-md px-2 py-1 text-sm text-white ${
                post.isResolved ? "bg-green-500" : "bg-red"
            }`}
            >
            {post.isResolved ? "Resolved" : "Unresolved"}
        </div>
      </div>

      <div className="space-y-1">
        <p className="font-medium">
          {post.title}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <ThumbsUp className="h-4 w-4" />
          <span>{post.likes}</span>
          <ThumbsDown className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{post.location}</span>
        </div>
      </div>
    </Card>
  );
}