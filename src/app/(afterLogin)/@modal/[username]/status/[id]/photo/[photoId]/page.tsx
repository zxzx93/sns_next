import styles from "./photoModal.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import PhotoModalCloseButton from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/PhotoModalCloseButton";
import SinglePost from "@/app/(afterLogin)/[username]/status/_component/SinglePost";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/_lib/getComments";
import ImageZone from "./_component/ImageZone";

type Props = {
  params: { id: string };
};
async function Default({ params }: Props) {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={styles.commentZone}>
          <SinglePost noImage id={id} />
          <CommentForm id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}

export default Default;
