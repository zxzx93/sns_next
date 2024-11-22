import styles from "./profile.module.css";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SignupModal from "@/app/(beforeLogin)/_component/SignupModal";
import { getUserPosts } from "@/app/(afterLogin)/[username]/_lib/getUserPosts";
import { getUser } from "@/app/(afterLogin)/[username]/_lib/getUser";
import UserPosts from "@/app/(afterLogin)/[username]/_component/UserPosts";
import UserInfo from "@/app/(afterLogin)/[username]/_component/UserInfo";

type Props = {
  params: { username: string };
};

async function Profile({ params }: Props) {
  const { username } = params;
  // const { data: session } = useSession();
  // const router = useRouter();
  console.log(params, "parmas");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  // const followHandler = () => {
  //   if (!session?.user) {
  //     return router.replace("/login");
  //   }
  // };

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}

export default Profile;
