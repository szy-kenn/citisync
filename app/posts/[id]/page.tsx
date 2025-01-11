import { getPost } from '@/lib/firebase/posts'
import { Card } from "@/components/ui/card"
import { MapPin, TriangleAlert } from 'lucide-react'
import { formatTimestamp, MarkerType } from "@/lib/utils";
import React from 'react'
import Map from '@/components/map';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PiCaretLeftBold } from 'react-icons/pi';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/router';
import BackButton from '@/components/back-button';

const Post = async ({ params }: {params: {id: string}}) => {

  const post = await getPost(params.id);

  if (!post) {
    return <p>Invalid Post ID</p>
  }

  const markers: MarkerType[] = [
    { id: 1, position: { lat: 14.5995, lng: 120.9842}, title: 'Manila' },
  ];

    return (
        <div className="p-4 space-y-4">
            <div className='flex gap-2 justify-between'>
                <BackButton />
                <p className='font-bold'>View Report</p>
                <PiCaretLeftBold className='h-6 w-6 opacity-0' />
            </div>
          <Separator />
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10">
                <div className="flex justify-center items-center bg-slate-500 h-12 aspect-square rounded-full">D</div>
              </div>
              <div className="space-y-1">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{post.user}</span>
                  <p className="text-xs">{formatTimestamp(post.createdAt)}</p>
                </div>
              </div>
            </div>
                <div className="flex bg-red text-white justify-center items-center rounded-md px-4 py-1 text-sm gap-1">
                    <TriangleAlert className="h-4 w-4" />
                    {post.category}
                </div>
          </div>
    
            {post.image_url && (
                <div className="relative h-full w-full">
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
            <p>
                {post.content}
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
          <div className='pt-2'>
            <p className='font-bold'>Location</p>
            <Map markers={markers} />
          </div>
          <div className='flex flex-col'>
            <p className='font-bold'>Feedback</p>
            <div>
                {post.feedback.map((feedback, index) => (
                    <Card key={index} className="p-4 space-y-4">
                        <div className='flex gap-4 items-center'>
                            <Avatar>
                                <AvatarFallback>AN</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold text-sm">{feedback.user_id}</p>
                        </div>
                        <p className='text-sm'>{feedback.content}</p>
                    </Card>
                ))}
            </div>
          </div>
        </div>
      );
}

export default Post
