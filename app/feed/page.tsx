import { getResolvedPosts } from "../../lib/firebase/posts";
import { Post } from "../../lib/types";
import PostCard from "./components/card";


export default async function Feed() {
  
  const posts = await getResolvedPosts();
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