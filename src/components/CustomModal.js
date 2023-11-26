import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  return (
    <Modal
      title="Thông báo"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Xóa"
      cancelText="Trở Về"
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
