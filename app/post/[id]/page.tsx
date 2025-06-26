import PostDetails from "@/components/postDetails"
import { Metadata } from "next"

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  
  return {
    title: `Post ${id}`,
    description: `Details for post ID: ${id}`
  }
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    return <div>Invalid post ID</div>;
  }

  return <PostDetails postId={postId} />
}