"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";

import styles from "./rightSearchZone.module.css";

function RightSearchZone() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onChangeAll = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("pf");
    router.replace(`/search?${params.toString()}`);
  };

  const onChangeFollow = () => {
    const params = new URLSearchParams(searchParams);
    params.set("pf", "on");
    router.replace(`/search?${params.toString()}`);
  };

  if (pathname === "/explore") {
    return null;
  }
  if (pathname === "/search") {
    return (
      <div>
        <h5 className={styles.filterTitle}>검색 필터</h5>
        <div className={styles.filterSection}>
          <div>
            <label>사용자</label>
            <div className={styles.radio}>
              <div>모든 사용자</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                onChange={onChangeAll}
              />
            </div>
            <div className={styles.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input
                type="radio"
                name="pf"
                value="on"
                onChange={onChangeFollow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  );
}

export default RightSearchZone;
