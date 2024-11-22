type Props = { pageParam?: number };

export const getPostRecommends = async ({ pageParam }: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "recommends"],
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("failed to fetch");
  return res.json();
};
