import React, { useEffect } from "react";
import { Spin } from "antd";
import { useAppDispatch, useAppSelector } from "reduxStore";
import CountSection from "./partials/CountSection";
import { thunkCountDocument } from "reduxStore/common/countDocument/countDocumentAsyncThunk";
import { WrapperLayout } from "components/shared";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { systemCount, loading } = useAppSelector(
    (state) => state.common.countDocument
  );

  useEffect(() => {
    dispatch(thunkCountDocument());
  }, []);

  return (
    <WrapperLayout>
      <Spin spinning={loading}>
        <div className="grid grid-cols-12">
          <div className="col-span-2 p-4">
            <CountSection title={'total product'} content={systemCount?.totalproduct} />
          </div>
        </div>
      </Spin>
    </WrapperLayout>
  );
};

export default HomePage;
