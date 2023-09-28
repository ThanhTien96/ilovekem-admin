import React, { useEffect } from "react";
import { Spin } from "antd";
import { useAppDispatch, useAppSelector } from "reduxStore";
import CountSection from "./partials/CountSection";
import { thunkCountDocument } from "reduxStore/common/countDocument/countDocumentAsyncThunk";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { systemCount, loading } = useAppSelector(
    (state) => state.common.countDocument
  );

  useEffect(() => {
    dispatch(thunkCountDocument());
  },[])

  return (
    <div>
      <div className="grid grid-cols-12">
        <Spin spinning={loading}>
          {systemCount &&
            Object.keys(systemCount).map((ele, index) => {
              console.log("☣️ >>> ele: ", ele)
              return (
                <div key={index} className="col-span-2 p-4">
                  <CountSection />
                </div>
              );
            })}

          <div className="col-span-2 p-4">
            <CountSection />
          </div>

          <div className="col-span-2 p-4">
            <CountSection />
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default HomePage;
