"use client";

import { useQuery } from "@tanstack/react-query";
import FollowRecommend from "./FollowRecommend";
import { User } from "@/model/User";
import { getFollowRecommends } from "../_lib/getFollowRecommends";

function FollowRecommendSection() {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommens"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((user) => <FollowRecommend key={user.id} user={user} />);
}

export default FollowRecommendSection;
