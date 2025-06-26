import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User , MessageSquare } from "lucide-react"
import Link from "next/link"
import { formatTitle, formatBody, getRandomDate } from "@/services/postServices"

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface PostCardProps {
  post: Post
  variant?: "featured" | "regular"
}

export default function PostCard({ post, variant = "regular" }: PostCardProps) {
  const user = {
    name: "Ali Tarek",
    avatar: "AT",
  }

  const isFeatured = variant === "featured";
  
  return (
    <Link href={`/post/${post.id}`}>
     <Card
      className={`group cursor-pointer transition-all duration-300 overflow-hidden h-full ${
        isFeatured 
          ? "mb-12 hover:shadow-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"
          : "hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      }`}
    >
      <CardContent className="p-0 h-full flex flex-col">
        {isFeatured ? (
          <div className="relative p-8 md:p-12 h-full flex flex-col">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 flex flex-col flex-grow">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">Featured</Badge>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-blue-100 transition-colors">
                {formatTitle(post.title)}
              </h1>
              <p className="text-blue-100 mb-6 text-lg leading-relaxed flex-grow">
                {formatBody(post.body)}
              </p>
              <div className="flex items-center gap-6 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-medium">
                    {user.avatar}
                  </div>
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{getRandomDate()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Read more</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-xs">
                  Post #{post.id}
                </Badge>
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {user.avatar}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                {formatTitle(post.title)}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed flex-grow">
                {formatBody(post.body)}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{getRandomDate()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </Link>
  )
}