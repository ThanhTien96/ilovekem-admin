import React, { useState, useRef, useEffect } from "react";
import { MenuOutlined, DeleteFilled, EditFilled } from "@ant-design/icons";
import { Popconfirm } from "antd";
type ProductActionProps = {
  onDelete?: () => void;
  onUpdate?: () => void;
};

const ProductAction: React.FC<ProductActionProps> = (props) => {
  const [openAction, setOpenAction] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setOpenAction(false);
      }
    };

    const handleScroll = () => {
      setOpenAction(false);
    };

    document.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={elementRef} className="absolute top-2 right-2">
      <MenuOutlined
        onClick={() => setOpenAction((current) => !current)}
        className="text-gray-500 hover:text-pink-500 cursor-pointer"
      />

      {/* modal action */}
      {openAction && (
        <div className="absolute right-0 bg-white p-4 shadow-xl border border-solid border-gray-300 rounded-sm">
          <div>
            <div
              onClick={() => {
                props.onUpdate && props.onUpdate();
                setOpenAction(false);
              }}
              className="flex items-center gap-2 hover:text-green-700 cursor-pointer pb-2"
            >
              <EditFilled />
              <p className="font-semibold">Update</p>
            </div>
            {/* delete action */}
            <div
              onClick={() => {
                props.onDelete && props.onDelete();
                setOpenAction(false);
              }}
              className="flex items-center gap-2 hover:text-rose-600 cursor-pointer"
            >
              <DeleteFilled />
              <p className="font-semibold">Delete</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAction;
