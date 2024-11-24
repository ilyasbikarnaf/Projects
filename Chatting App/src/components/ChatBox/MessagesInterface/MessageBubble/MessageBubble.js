import style from "./MessageBubble.module.css";
import animeImg from "../../../../Assets/anime.jpg";

function MessageBubble({ text, userId, timeCreated, currentUser, otherUser }) {
  const time = new Date(timeCreated).toLocaleString(navigator.local, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={`${style.allMessage} ${
        userId === currentUser.uid ? style.myMessageWrapper : ""
      }`}
    >
      <div className={style.imgAndDate}>
        <img
          src={
            (currentUser.uid === userId
              ? currentUser.profileImage
              : otherUser.profileImage) || animeImg
          }
          className={style.userImg}
          alt="user img"
        />
        <p className={style.date}>{time}</p>
      </div>
      <div
        className={`${style.messageWrapper} ${
          userId === currentUser.uid ? style.myUserWrapper : ""
        }`}
      >
        <p className={style.messageContent}>{text}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
