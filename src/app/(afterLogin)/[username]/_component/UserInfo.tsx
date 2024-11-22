"use client";

import styles from "../profile.module.css";
import { useQuery } from "@tanstack/react-query";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import { User } from "@/model/User";
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";

type Props = {
  username: string;
};

function UserInfo({ username }: Props) {
  const { data: user, error } = useQuery<User, Object, User, [string, string]>({
    queryKey: ["users", username],
    queryFn: getUser,
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
  });

  const renderError = () => (
    <>
      <div className={styles.header}>
        <BackButton />
        <h3 className={styles.headerTitle}>프로필</h3>
      </div>
      <div className={styles.userZone}>
        <div className={styles.userImage}></div>
        <div className={styles.userName}>
          <div>@{username}</div>
        </div>
      </div>
      <div className={styles.errorMessage}>계정이 존재하지 않음</div>
    </>
  );

  const renderUserInfo = () => (
    <>
      <div className={styles.header}>
        <BackButton />
        <h3 className={styles.headerTitle}>{user?.nickname}</h3>
      </div>
      <div className={styles.userZone}>
        <div className={styles.userImage}>
          <img src={user?.image} alt={user?.id} />
        </div>
        <div className={styles.userName}>
          <div>{user?.nickname}</div>
          <div>@{user?.id}</div>
        </div>
        <button className={styles.followButton}>팔로우</button>
      </div>
    </>
  );

  if (error) return renderError();
  if (!user) return null;

  return renderUserInfo();
}

export default UserInfo;
