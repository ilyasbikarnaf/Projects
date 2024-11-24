import style from "./MessageSending.module.css";
import imgUpload from "../../../../Assets/img_upload.png";
import sendBtn from "../../../../Assets/sendMessage.png";
import recordBtn from "../../../../Assets/record.png";
import { useState } from "react";

function MessageSending({ onSendMessage }) {
  const [messageText, setMessageText] = useState("");

  async function handleSendButton() {
    if (!messageText) return;
    await onSendMessage(messageText);
    setMessageText("");
  }

  async function handleEntreKey(e) {
    if (!messageText) return;

    if (e.key === 'Enter') {
      await onSendMessage(messageText);
      setMessageText("");
      
    }
  }

  return (
    <div className={style.message}>
      {/* <div className={style.imageBtn}>
        <img src={imgUpload} alt="upload img" className={style.imageIcon} />
      </div> */}
      <input
        type="text"
        placeholder="Send a message"
        className={style.submitMessages}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={handleEntreKey}
      />
      <div className={style.sendBtn}>
        <img
          src={sendBtn}
          className={style.sendIcon}
          alt=""
          onClick={handleSendButton}
        />
      </div>
    </div>
  );
}

export default MessageSending;
