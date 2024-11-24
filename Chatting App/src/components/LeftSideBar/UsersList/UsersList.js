import SearchBar from "./SearchBar/SearchBar";
import User from "./User/User";
import style from "./UsersList.module.css";
import useGetAndFetchUsers from "../../../CustomHooks/useGetAndFetchUsers";
import { getAuth } from "firebase/auth";
import { useState } from "react";

function UsersList({ users, setActiveId, activeId, setOtherActiveUser }) {
  // const {users, setActiveId, activeId} = useGetAndFetchUsers()

  function handleActiveUser(user) {
    setActiveId(user.uid === activeId ? "null" : user.uid);
    setOtherActiveUser(user.uid === activeId ? "null" : user.uid);
  }

  const [displayedUsers, setDisplayedUsers] = useState(users);



  return (
    <div className={style.usersContainer}>
      <SearchBar users={users} setDisplayedUsers={setDisplayedUsers} />

      {(displayedUsers.length !== 0 ? displayedUsers : users)
        .filter((user) => getAuth().currentUser?.uid !== user.uid)
        .map((user) => {
          return (
            <User
              key={user.uid}
              img={user.profileImage}
              uid={user.uid}
              username={user.username}
              onActiveId={() => handleActiveUser(user)}
              activeId={activeId}
            />
          );
        })}
    </div>
  );
}

export default UsersList;
