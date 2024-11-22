"use client";

import styles from "./followRecommend.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFollowRecommends } from "../_lib/getFollowRecommends";
import { User } from "@/model/User";

function FollowRecommend({ user }: { user: User }) {
  const { data: session } = useSession();
  const router = useRouter();

  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommens"],
    queryFn: getFollowRecommends,
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
  });

  const onFollow = () => {
    if (!session?.user) {
      router.replace("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userLogoSection}>
        <div className={styles.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.title}>{user.nickname}</div>
        <div className={styles.count}>@{user.id}</div>
      </div>
      <div className={styles.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  );
}

export default FollowRecommend;
