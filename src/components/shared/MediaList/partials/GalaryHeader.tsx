import React from "react";
import {CloseOutlined} from '@ant-design/icons'

type Props = {};

const GalaryHeader = (props: Props) => {
  return (
    <div className="flex justify-end">
      <CloseOutlined />
    </div>
  );
};

export default GalaryHeader;
