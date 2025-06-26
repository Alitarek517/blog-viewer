// services/postServices.ts
"use client";

import api from "axios";
import { useQuery , useInfiniteQuery } from "@tanstack/react-query";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPostById = async (id: number): Promise<Post> => {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const getPosts = async (page: number, limit: number): Promise<Post[]> => {
  const response = await api.get(BASE_URL, {
    params: {
      _page: page,
      _limit: limit,
      _sort: "id",
    }
  });
  return response.data;
};

export const usePosts = () =>
  useInfiniteQuery<Post[], Error>({
    queryKey: ["posts"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getPosts(pageParam as number, (pageParam as number) === 1 ? 13 : 12),
    getNextPageParam: (lastPage, allPages) => {
      const currentPageCount = allPages.length;
      const expectedCount = currentPageCount === 1 ? 13 : 12;

      return lastPage.length === expectedCount
        ? currentPageCount + 1
        : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

export const usePost = (id: number) =>
  useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    staleTime: 5 * 60 * 1000,
  });

export const formatTitle = (title: string): string =>
  title.charAt(0).toUpperCase() + title.slice(1);

export const formatBody = (body: string): string =>
  body.replace(/\n/g, " ").substring(0, 120) + "...";

export const getRandomDate = (): string => {
  const dates = [
    "Jan 1, 2025",
    "Jan 2, 2025",
    "Jan 6, 2025",
    "Jan 8, 2025",
    "Jan 11, 2025",
    "Jan 14, 2025",
  ];
  return dates[Math.floor(Math.random() * dates.length)];
};
