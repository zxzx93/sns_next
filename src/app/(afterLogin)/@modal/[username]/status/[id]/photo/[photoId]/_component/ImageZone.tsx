"use client";

import styles from "../photoModal.module.css";
import { useQuery } from "@tanstack/react-query";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/_lib/getSinglePost";
import { Post } from "@/model/Post";

type Props = { id: string };

function ImageZone({ id }: Props) {
  const { data: post } = useQuery<Post, Object, Post, [_1: string, _2: string]>(
    {
      queryKey: ["posts", id],
      queryFn: getSinglePost,
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    }
  );

  if (!post?.Images[0]) return null;

  return (
    <div className={styles.imageZone}>
      <img src={post.Images[0].link} alt={post.content} />
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${post.Images[0].link})` }}
      />
      <div className={styles.buttonZone}>
        <div className={styles.buttonInner}>
          <ActionButtons white />
        </div>
      </div>
    </div>
  );
}

export default ImageZone;
