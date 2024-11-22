"use client";

import styles from "../[id]/singlePost.module.css";
import { useQuery } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";
import { getSinglePost } from "../_lib/getSinglePost";
import Post from "@/app/(afterLogin)/_component/Post";

type Props = {
  id: string;
  noImage?: boolean;
};

function SinglePost({ id, noImage }: Props) {
  const { data: post, error } = useQuery<
    IPost, // queryFn에 의해 반환될 데이터의 타입(서버에서 가져올 데이터의 예상 타입)
    Object, // 에러 타입
    IPost, // 쿼리 결과로서 클라이언트에서 사용할 데이터의 타입
    [_1: string, _2: string] // 쿼리 키의 타입 (여기서는 문자열 두 개와 사용자 이름을 포함하는 배열).
  >({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
  });

  if (error) {
    return <div className={styles.noPost}>게시글을 찾을 수 없습니다.</div>;
  }

  if (!post) {
    return null;
  }
  return <Post key={post.postId} post={post} noImage={noImage} />;
}

export default SinglePost;
