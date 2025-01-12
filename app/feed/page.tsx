import { getAllPosts } from "@/lib/firebase/posts";
import { Post } from "@/lib/types";
import PostCard from "./components/card";

export const dynamic = 'force-dynamic';

export default async function ResolvedPost() {
  
  const posts = await getAllPosts();
  console.log(posts);

  return (
    <div className="">
      <div className="flex flex-col gap-3 px-5 mt-4">
        {posts?.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}