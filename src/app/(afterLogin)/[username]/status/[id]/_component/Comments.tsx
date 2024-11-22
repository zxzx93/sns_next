"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getComments } from "../../_lib/getComments";
import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";

type Props = {
  id: string;
};

function Comments({ id }: Props) {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["posts", id]);

  const { data, error } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
    staleTime: 60 * 1000, // 1분
    gcTime: 300 * 1000, // 5분
    enabled: !!post,
  });

  if (!post) {
    return null; // post가 없으면 null 반환
  }
  return data?.map((post) => <Post key={post.postId} post={post} />);
}

export default Comments;
