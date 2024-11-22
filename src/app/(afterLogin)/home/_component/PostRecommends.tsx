"use client";

import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { useEffect } from "react";

function PostRecommends() {
  const { data, isFetching, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["posts", "recommends"],
      queryFn: getPostRecommends,
      gcTime: 300 * 1000,
      staleTime: 60 * 1000,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    });
  // 인피니트 스크롤
  const { ref, inView } = useInView({
    threshold: 0.5, // 요소의 일부가 보일 때
    delay: 500, // 지연 시간 설정
  });
  const posts = data?.pages.flat() || []; // 2차원 배열 평탄화

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      {posts.map((post) => (
        <Post post={post} key={post.postId} />
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}

export default PostRecommends;
