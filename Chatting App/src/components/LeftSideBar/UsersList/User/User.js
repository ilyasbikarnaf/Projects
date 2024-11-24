import style from "./User.module.css";
import animeImg from "../../../../Assets/anime.jpg";

function User({img, username, uid, activeId, onActiveId}) {
  return (
    <div className={`${style.userContainer} ${uid === activeId ? `${style.active}` : ''} `} onClick={onActiveId} >
      <img src={img || animeImg} className={style.photo} alt="user" />
      <div className={style.userText}>
        <div className={style.userName}>{username}</div>
      </div>
    </div>
  );
}

export default User;
