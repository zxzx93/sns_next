"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getFollowingPosts } from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";

function FollowingPosts() {
  const { data, isFetching } = useSuspenseQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
  });

  return data?.map((post) => <Post post={post} key={post.postId} />);
}

export default FollowingPosts;
