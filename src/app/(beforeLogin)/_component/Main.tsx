import Link from "next/link";
import Image from "next/image";
import styles from "./main.module.css";
import Logo from "/public/logo.png";

function Main() {
  return (
    <>
      <div className={styles.left}>
        <Image src={Logo} alt="logo" width={500} height={500} priority />
      </div>
      <div className={styles.right}>
        <h1>지금 일어나고 있는 일</h1>
        <h2>지금 가입하세요.</h2>
        <Link href={"/i/flow/signup"} className={styles.signup}>
          계정 만들기
        </Link>
        <h3>이미 트위터에 가입 하셨나요?</h3>
        <Link href={"/login"} className={styles.login}>
          로그인
        </Link>
      </div>
    </>
  );
}

export default Main;
