import style from "./MessagesInterface.module.css";
import MessageBubble from "./MessageBubble/MessageBubble";

function MessagesInterface({ messages, currentUser, otherUser }) {
  return (
    <div className={style.messages}>
      {messages.map((message) => {
        return (
          <MessageBubble
            otherUser={otherUser}
            currentUser={currentUser}
            key={message.id}
            text={message.text}
            userId={message.UserId}
            timeCreated={message.timeCreated}
          />
        );
      })}
    </div>
  );
}

export default MessagesInterface;
