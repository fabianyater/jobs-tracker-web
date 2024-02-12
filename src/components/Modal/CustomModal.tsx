import { Button, Modal } from "flowbite-react";
import React, { ReactNode } from "react";
import { usePostulacionContext } from "../../hooks/usePostulacionContext";

export type ModalProps = {
  children: ReactNode;
  showModal: boolean;
  showFooter: boolean;
  title: string;
};

const CustomModal: React.FC<ModalProps> = ({
  children,
  showModal,
  showFooter,
  title,
}) => {
  const { toggleFormVisible } = usePostulacionContext();

  return (
    <>
      <Modal dismissible show={showModal} onClose={toggleFormVisible}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">{children}</div>
        </Modal.Body>
        {showFooter && (
          <Modal.Footer>
            <Button onClick={toggleFormVisible}>I accept</Button>
            <Button color="gray" onClick={toggleFormVisible}>
              Decline
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default CustomModal;
