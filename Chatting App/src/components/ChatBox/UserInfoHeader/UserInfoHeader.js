import style from "./UserInfoHeader.module.css";
import animeImg from "../../../Assets/anime.jpg";

function UserInfoHeader({ otherUser }) {
  return (
    <div className={style.userInfo}>
      <img
        src={otherUser?.profileImage || animeImg}
        className={style.profilePhoto}
        alt="profile img"
      />
      <p>{otherUser?.username || "guest"}</p>
    </div>
  );
}

export default UserInfoHeader;
