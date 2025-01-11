import { getPost } from '@/lib/firebase/posts'
import React from 'react'

const Post = async ({ params }: {params: {id: string}}) => {

  const post = await getPost(params.id);

  if (!post) {
    return <p>Invalid Post ID</p>
  }

  return (
    <div>
        <p>{post.id}</p>
        <p>{post.title}</p>
    </div>
  )

}

export default Post