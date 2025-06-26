import PostDetails from "@/components/postDetails"


export default async function PostPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const postId = parseInt(params.id);

  if (isNaN(postId)) {
    return <div>Invalid post ID</div>;
  }

  return <PostDetails postId={postId} />
}