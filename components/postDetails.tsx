"use client";

import { usePost } from "@/services/postServices";
import { Loader2, ArrowLeft, Calendar, User, ThumbsUp, MessageCircle, Bookmark, Share2, Twitter, Facebook, Linkedin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { formatTitle } from "@/services/postServices";

interface PostDetailProps {
  postId: number;
}

export default function PostDetail({ postId }: PostDetailProps) {
  const { data: post, isLoading, error } = usePost(postId);

  const user = { name: "Ali Tarek", avatar: "AT", bio: "Content creator and tech enthusiast" };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Post</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
        <Link href="/">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link href="/">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </Link>

      <article className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-4 left-6">
            <Badge className="bg-white/20 text-white border-white/30">Post #{post.id}</Badge>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            {formatTitle(post.title)}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Jan 15, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>User ID: {post.userId}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600">
              <AvatarFallback className="bg-transparent text-white font-semibold">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
            </div>
          </div>

          <div className="mb-6 flex gap-3 flex-wrap">
            {[{ icon: ThumbsUp, label: "Like" }, { icon: MessageCircle, label: "Comment" }, { icon: Bookmark, label: "Save" }, { icon: Share2, label: "Share" }].map(({ icon: Icon, label }) => (
              <Button key={label} variant="outline" size="sm" className="bg-white dark:bg-gray-800">
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>

          <Separator className="mb-8" />

          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {post.body.replace(/\n/g, "\n\n")}
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Share this post</h3>
            <div className="flex gap-3 flex-wrap">
              {[{ icon: Twitter, label: "Twitter" }, { icon: Facebook, label: "Facebook" }, { icon: Linkedin, label: "LinkedIn" }, { icon: LinkIcon, label: "Copy Link" }].map(({ icon: Icon, label }) => (
                <Button key={label} variant="outline" size="sm" className="bg-white dark:bg-gray-800">
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <Card className="p-6 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600">
                <AvatarFallback className="bg-transparent text-white font-semibold">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  About {user.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{user.bio}</p>
                <Button variant="outline" size="sm">View Profile</Button>
              </div>
            </div>
          </Card>
        </div>
      </article>
    </div>
  );
}
