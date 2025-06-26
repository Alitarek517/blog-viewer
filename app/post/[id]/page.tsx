import PostDetails from "@/components/postDetails"

interface PageProps {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    return <div>Invalid post ID</div>;
  }

  return <PostDetails postId={postId} />
}