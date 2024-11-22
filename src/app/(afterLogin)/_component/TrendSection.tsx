"use client";

import styles from "./trendSection.module.css";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Trend from "@/app/(afterLogin)/_component/Trend";
import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";
import { Hashtag } from "@/model/Hashtag";

function TrendSection() {
  const { data: session } = useSession();
  const pathName = usePathname();

  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    gcTime: 300 * 1000,
    staleTime: 60 * 1000,
    enabled: !!session?.user, // 로그인 했을 경우에만 데이터 가져옴
  });

  if (pathName === "/explore") {
    return null;
  }

  return (
    <div className={styles.trendBg}>
      {session?.user ? (
        <div className={styles.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend) => (
            <Trend key={trend.tagId} trend={trend} />
          ))}
        </div>
      ) : (
        <div className={styles.noTrend}>트렌드를 가져올 수 없습니다.</div>
      )}
    </div>
  );
}

export default TrendSection;
