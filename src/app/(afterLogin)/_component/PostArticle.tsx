"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import style from "./post.module.css";
import { Post } from "@/model/Post";

type Props = {
  children: ReactNode;
  post: Post;
};

function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    <article onClickCapture={onClick} className={style.post}>
      {children}
    </article>
  );
}

export default PostArticle;
