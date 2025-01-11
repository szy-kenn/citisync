'use client'
import { Post } from "@/lib/types";
import { Card } from "@/components/ui/card"
import { MapPin, TriangleAlert } from 'lucide-react'
import { formatTimestamp } from "@/lib/utils";
import { redirect } from "next/navigation";



interface PostCardProps {
  post: Post;
  isShortened?: boolean;
}

export default function PostCard({ post, isShortened = false }: PostCardProps) {

    const initial_date = post.createdAt;

  return (
    <Card className="max-w-md p-4 space-y-4 cursor-pointer" onClick={() => redirect(`/posts/${post.id}`)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10">
            <div className="flex justify-center items-center bg-slate-500 h-12 aspect-square rounded-full">D</div>
          </div>
          <div className="space-y-1">
            <div className="flex flex-col gap-1">
              <span className="font-medium">{post.user}</span>
              <p className="text-xs">{formatTimestamp(initial_date)}</p>
            </div>
          </div>
        </div>
            <div className="flex bg-red text-white justify-center items-center rounded-md px-4 py-1 text-sm gap-1">
                <TriangleAlert className="h-4 w-4" />
                {post.category}
            </div>
      </div>

        {!isShortened && post.image_url && (
            <div className="relative h-52 w-full">
                <img
                    src={post.image_url}
                    className="rounded-md"
                    alt="image_url"
                />
            </div>
        )}
      <div className="space-y-1">
        <p className="font-medium">
          {post.title}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1 bg-slate-700 px-1 py-1 rounded-md text-white">
            <img src="/like_filled.svg" alt="like" />
            <span>{post.likes}</span>
            <img src="/dislike.svg" alt="dislike" />
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{post.location}</span>
        </div>
      </div>
    </Card>
  );
}