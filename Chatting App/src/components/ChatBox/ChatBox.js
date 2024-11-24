import style from "./ChatBox.module.css";
import MessageSending from "./MessagesInterface/MessageSending/MessageSending";
import UserInfoHeader from "./UserInfoHeader/UserInfoHeader";
import MessagesInterface from "./MessagesInterface/MessagesInterface";
import { useState, useEffect, useRef } from "react";
import {
  getDatabase,
  ref,
  get,
  set,
  push,
  onValue,
  serverTimestamp,
} from "firebase/database";
import { getAuth } from "firebase/auth";

function ChatBox({ users, activeId, otherActiveUser }) {
  const otherUser = users.find((user) => user.uid === activeId);

  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const auth = getAuth();

  useEffect(
    function () {
      async function createChatRoom() {
        if (!otherUser?.uid) return;

        const currentUserId = auth.currentUser?.uid;
        if (!currentUserId) return;
        const roomId = [currentUserId, otherUser?.uid].sort().join("_");

        const db = getDatabase();
        const roomRef = ref(db, `Chats/${roomId}`);

        // check if room exists
        const snapshot = await get(roomRef);

        if (!snapshot.exists()) {
          await set(roomRef, {
            participants: {
              [currentUserId]: true,
              [otherUser?.uid]: true,
            },
            createdAt: serverTimestamp(),
          });
        }

        setRoomId(roomId);
      }
      createChatRoom();
    },
    [auth.currentUser?.uid, otherUser]
  );

  // messages Listener

  useEffect(
    function () {
      if (!roomId) return;

      const db = getDatabase();
      const messageRef = ref(db, `Chats/${roomId}/messages`);

      const unsubscribe = onValue(messageRef, (snapshot) => {
        const messagesList = [];

        snapshot.forEach((snapshotMessage) => {
          messagesList.push({
            id: snapshotMessage.key,
            ...snapshotMessage.val(),
          });
        });


        setMessages(messagesList);
      });
      return () => unsubscribe();
    },
    [roomId]
  );

  async function handleSendMessage(text) {
    if (!roomId || !text.trim()) return;
    const db = getDatabase();
    const messageRef = ref(db, `Chats/${roomId}/messages`);

    await push(messageRef, {
      text,
      UserId: getAuth()?.currentUser?.uid,
      timeCreated: serverTimestamp(),
    });
  }

  const currentUser = users.find(
    (user) => user?.uid === getAuth()?.currentUser?.uid
  );

  return (
    <div className={style.container}>
      {(otherActiveUser !== "null" && otherActiveUser) ? (
        <>
          <UserInfoHeader otherUser={otherUser} />
          <MessagesInterface
            messages={messages}
            otherUser={otherUser}
            currentUser={currentUser}
            activeId={activeId}
          />
          <MessageSending onSendMessage={handleSendMessage} />
        </>
      ) : <div className={style.emptyChat}>Click or Create another User And Start Chatting</div>}
    </div>
  );
}

export default ChatBox;
