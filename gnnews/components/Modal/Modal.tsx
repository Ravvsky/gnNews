import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Modal = (props: {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}) => {
  const { onClose, children, title } = props;
  const [isBrowser, setIsBrowser] = useState(false);

  const modalWrapperRef = React.useRef<HTMLDivElement>(null);

  const backDropHandler = useCallback(
    (e: MouseEvent) => {
      if (
        e.target instanceof Node &&
        modalWrapperRef.current?.contains(modalWrapperRef.current) &&
        modalWrapperRef?.current !== null
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    setIsBrowser(true);

    window.addEventListener("click", backDropHandler);

    return () => window.removeEventListener("click", backDropHandler);
  }, [backDropHandler]);

  const handleCloseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };
  const modalContent = (
    <div
      data-testid="modal"
      className="fixed top-0 left-0 w-full h-full flex justify-center bg-[rgba(0,0,0,0.5)] "
    >
      <div className="w-[50%] h-min" ref={modalWrapperRef}>
        <div className="bg-white h-full w-full  overflow-auto relative top-[5rem] p-[2rem] rounded-[1rem]">
          <div className="flex justify-end text-3xl">
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          {title && <div className="text-[2rem] font-medium">{title}</div>}
          <div className="py-[1rem] h-full">{children}</div>
        </div>
      </div>
    </div>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    );
  } else {
    return null;
  }
};

export default Modal;
