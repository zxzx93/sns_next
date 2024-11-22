"use client";

import style from "../search.module.css";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function Tab() {
  const [current, setCurrent] = useState("hot");

  const router = useRouter();
  const searchParams = useSearchParams();

  const onClickHot = () => {
    setCurrent("hot");
    const params = new URLSearchParams(searchParams);
    params.delete("f");
    router.replace(`/search?${params.toString()}`);
  };

  const onClickNew = () => {
    setCurrent("new");
    const params = new URLSearchParams(searchParams);
    params.set("f", "live");
    router.replace(`/search?${params.toString()}`);
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div onClick={onClickHot}>
          인기
          <div className={style.tabIndicator} hidden={current === "new"}></div>
        </div>
        <div onClick={onClickNew}>
          최신
          <div className={style.tabIndicator} hidden={current === "hot"}></div>
        </div>
      </div>
    </div>
  );
}

export default Tab;
