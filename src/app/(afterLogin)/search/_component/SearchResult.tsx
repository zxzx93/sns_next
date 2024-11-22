"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getSearchResult } from "@/app/(afterLogin)/search/_lib/getSearchResult";

type Props = { searchParams: { q: string; f?: string; pf?: string } };

function SearchResult({ searchParams }: Props) {
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, searchParams: Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
  });

  return data?.map((post) => <Post post={post} key={post.postId} />);
}

export default SearchResult;
