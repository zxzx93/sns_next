"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPosts } from "../_lib/getUserPosts";
import { Post as IPost } from "@/model/Post";
import Post from "@/app/(afterLogin)/_component/Post";

type Props = {
  username: string;
};

function UserPosts({ username }: Props) {
  const { data } = useQuery<
    IPost[], // queryFn에 의해 반환될 데이터의 타입(서버에서 가져올 데이터의 예상 타입)
    Object, // 에러 타입
    IPost[], // 쿼리 결과로서 클라이언트에서 사용할 데이터의 타입
    [_1: string, _2: string, username: string] // 쿼리 키의 타입 (여기서는 문자열 두 개와 사용자 이름을 포함하는 배열).
  >({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
  });
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);

  if (!user) {
    return null;
  }
  return data?.map((post) => <Post key={post.postId} post={post} />);
}

export default UserPosts;
