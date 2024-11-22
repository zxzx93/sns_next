"use client";

import { useRouter } from "next/navigation";
import styles from "./logoutButton.module.css";
import { signOut, useSession } from "next-auth/react";

function LogoutButton() {
  const { data: me, status } = useSession();
  const router = useRouter();

  if (!me?.user) {
    return null;
  }
  console.log(me, "유저");

  // const queryClient = useQueryClient();

  function onLogout() {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  }

  return (
    <button className={styles.logOutButton} onClick={onLogout}>
      <div className={styles.logOutUserImage}>
        <img src={me.user.image as string} alt={me.user.id} />
      </div>
      <div className={styles.logOutUserName}>
        <div>{me.user.name}</div>
        <div>@{me.user.id}</div>
      </div>
    </button>
  );
}

export default LogoutButton;
