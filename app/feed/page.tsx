import { getAllPosts } from "../../lib/firebase/posts";
import { Post } from "../../lib/types";
import PostCard from "./components/card";
import BottomBar from "./components/bottom-bar";
import { TopBar } from "./components/top-bar";

export default async function Feed() {
  
  const posts = await getAllPosts();
  console.log(posts);

  return (
    <div className="py-5">
      <TopBar />
      <div className="flex flex-col gap-3 px-5">
        {posts?.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <BottomBar />
    </div>
  )
}