"use client";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { faker } from "@faker-js/faker";
import styles from "../message.module.css";
import { useRouter } from "next/navigation";

dayjs.locale("ko");
dayjs.extend(relativeTime);

function Room() {
  const router = useRouter();

  const user = {
    id: "hero",
    nickname: "영웅",
    Messages: [
      { roomId: 123, content: "안녕하세용!", createAt: new Date() },
      { roomId: 123, content: "조심히가세요!", createAt: new Date() },
      { roomId: 123, content: "밥 드세여!", createAt: new Date() },
    ],
  };

  const onclick = () => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`);
  };

  return (
    <div className={styles.room} onClickCapture={onclick}>
      <div className={styles.roomUserImage}>
        <img src={faker.image.avatar()} alt="" />
      </div>
      <div className={styles.roomChatInfo}>
        <div className={styles.roomUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>
          &nbsp;
          <span className={styles.postDate}>
            {dayjs(user.Messages?.at(-1)?.createAt).fromNow()}
          </span>
        </div>
        <div className={styles.roomLastChat}>
          {user.Messages?.at(-1)?.content}
        </div>
      </div>
    </div>
  );
}

export default Room;
