import { NextPage } from "next";
import Link from "next/link";

const NotFound: NextPage = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>이 페이지는 존재하지 않습니다. 다른 페이지를 검색해 주세요.</p>
      <Link href="/search">검색</Link>
    </div>
  );
};

export default NotFound;
