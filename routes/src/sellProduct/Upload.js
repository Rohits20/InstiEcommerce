import React from 'react'
import { RMIUploader } from "react-multiple-image-uploader";
import { useState } from "react";

const Upload = () => {
    const [visible, setVisible] = useState(false);
    const handleSetVisible = () => {
      setVisible(true);
    };
    const hideModal = () => {
      setVisible(false);
    };
    const onUpload = (data) => {
    };
    const onSelect = (data) => {
    };
    const onRemove = (id) => {
    };
  return (
    <div>
        <RMIUploader
        isOpen={visible}
        hideModal={hideModal}
        onSelect={onSelect}
        onUpload={onUpload}
        onRemove={onRemove}
      />
    </div>
  )
}

export default Upload
