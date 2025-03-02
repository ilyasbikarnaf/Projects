import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import cc from "../utils/cc";

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  // @ts-expect-error: prevIsOpen depend on the previous state of isOpen which is unknown
  const prevIsOpen = useRef<boolean>();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  });

  useLayoutEffect(() => {

    
    if (prevIsOpen.current && !isOpen) {
      setIsClosing(true);
    }

    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return createPortal(
    <div
      onAnimationEnd={() => setIsClosing(false)}
      className={cc(isClosing && "closing", "modal")}
    >
      <div className="overlay" onClick={onClose}></div>
      <div className="modal-body">{children}</div>
    </div>,
    document.querySelector("#modal-container") as HTMLElement
  );
}
