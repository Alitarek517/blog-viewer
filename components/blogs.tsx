import PostCard from "@/components/postCard";
import { usePosts } from "@/services/postServices";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next"; 
export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Browse our latest articles and blog posts",
  openGraph: {
    title: "Blog Posts | Blog Viewer",
    description: "Explore our collection of insightful articles",
    url: "/blog",
  },
  alternates: {
    canonical: "/blog",
  },
};
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function BlogListing() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();

  const featuredPost = data?.pages[0]?.[0];

  const regularPosts: Post[] = [];
  data?.pages.forEach((page, pageIndex) => {
    const postsToAdd = pageIndex === 0 ? page.slice(1) : page;
    postsToAdd.forEach(post => regularPosts.push(post));
  });

  if (isLoading && !isFetchingNextPage) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-96 w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">
            Error: {error.message}
          </div>
        </div>
      </div>
    );
  }

  if (!featuredPost && regularPosts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">No posts found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {featuredPost && <PostCard post={featuredPost} variant="featured" />}
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {regularPosts.map((post, index) => (
          <PostCard 
            key={`${post.id}-${index}`} 
            post={post} 
            variant="regular" 
          />
        ))}

        {isFetchingNextPage && 
          [...Array(6)].map((_, i) => (
            <Skeleton key={`skeleton-${i}`} className="h-64 w-full" />
          ))
        }
      </div>
      
      {hasNextPage && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-8 py-4 text-lg"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}