import { getAuth } from "firebase/auth";
import style from "./UserProfileDetails.module.css";
import animeImg from "../../../Assets/anime.jpg";

function UserDetails({ users }) {
  const currentUser = users.find(
    (user) => user?.uid === getAuth().currentUser?.uid
  );
  return (
    <div className={style.profileDetails}>
      <img src={currentUser.profileImage || animeImg} alt=''></img>
    </div>
  );
}

export default UserDetails;
