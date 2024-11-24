import LeftSideBar from "../../components/LeftSideBar/UsersList/UsersList";
import RightSideBar from "../../components/RightSideBar/userDetails";
import ChatBox from "../../components/ChatBox/ChatBox";
import style from "./ChattingPage.module.css";
import useGetAndFetchUsers from "../../CustomHooks/useGetAndFetchUsers";
import { useState } from "react";

function ChattingPage() {
  const { users, setActiveId, activeId } = useGetAndFetchUsers();
  const [otherActiveUser, setOtherActiveUser] = useState('');

  return (
    <div className={style.container}>
      <div className={style.itemsContainer}>
        <LeftSideBar
          users={users}
          activeId={activeId}
          setActiveId={setActiveId}
          setOtherActiveUser={setOtherActiveUser}
        />
        <ChatBox
          users={users}
          activeId={activeId}
          otherActiveUser={otherActiveUser}
        />
        <RightSideBar users={users}/>
      </div>
    </div>
  );
}

export default ChattingPage;
