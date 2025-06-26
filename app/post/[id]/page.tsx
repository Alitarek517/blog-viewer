import PostDetails from "@/components/postDetails"
import { Metadata , ResolvingMetadata  } from "next"

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata>{
  const { id } = await params
  return {
    title: `Post ${id}`,
    description: `Details for post ID: ${id}`
  }
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    return <div>Invalid post ID</div>;
  }

  return <PostDetails postId={postId} />
}