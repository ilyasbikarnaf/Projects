import style from "./userDetails.module.css";
import Logout from "./LogoutBtn/Logout";

function UsersList({ users }) {
  return (
    <div className={style.usersContainer}>

      <Logout />
    </div>
  );
}

export default UsersList;
