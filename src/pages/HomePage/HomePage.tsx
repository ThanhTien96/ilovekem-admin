import React, { useEffect } from "react";
import { Spin } from "antd";
import { useAppDispatch, useAppSelector } from "reduxStore";
import CountSection from "./partials/CountSection";
import { thunkCountDocument } from "reduxStore/common/countDocument/countDocumentAsyncThunk";
import { WrapperLayout } from "components/shared";
import MediaSection from "./partials/MediaSection";
import {
  CodeSandboxOutlined,
  ContainerFilled,
  PictureFilled,
  AntCloudOutlined,
  ShopFilled,
  SlackOutlined,
} from "@ant-design/icons";
import { thunkGetAllMedia } from "reduxStore/common/media/mediaAsyncThunk";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { systemCount, loading } = useAppSelector(
    (state) => state.common.countDocument
  );
  const { mediaList, mediaLoading } = useAppSelector(
    (state) => state.common.mediaSlice
  );

  useEffect(() => {
    dispatch(thunkCountDocument());
    dispatch(thunkGetAllMedia());
  }, []);

  return (
    <WrapperLayout>
      <Spin spinning={loading}>
        <div className="grid grid-cols-12">
          {/* product all */}
          <div className="col-span-4 xl:col-span-2 p-4">
            <CountSection
              title={"total product"}
              content={systemCount?.totalproduct}
              icon={
                <CodeSandboxOutlined className="text-5xl text-green-300 opacity-50" />
              }
            />
          </div>

          {/* post all */}
          <div className="col-span-4 xl:col-span-2 p-4">
            <CountSection
              title={"total post"}
              content={systemCount?.totalPost}
              icon={
                <ContainerFilled className="text-5xl text-green-300 opacity-50" />
              }
            />
          </div>

          {/* all banner */}
          <div className="col-span-4 xl:col-span-2 p-4">
            <CountSection
              title={"total banner"}
              content={systemCount?.totalBanner}
              icon={
                <PictureFilled className="text-5xl text-gray-400 opacity-50" />
              }
            />
          </div>

          {/* total shop system */}
          <div className="col-span-4 xl:col-span-2 p-4">
            <CountSection
              title={"shop system"}
              content={systemCount?.totalShopSystem}
              icon={
                <ShopFilled className="text-5xl text-green-300 opacity-50" />
              }
            />
          </div>

          {/* total product public */}
          <div className="col-span-4 xl:col-span-2 p-4">
            <CountSection
              title={"product public"}
              content={systemCount?.totalProductPublic}
              icon={
                <AntCloudOutlined className="text-6xl text-sky-500 opacity-50" />
              }
            />
          </div>

          {/* total post public */}
          <div className="col-span-4 xl:col-span-2 p-4">
            <CountSection
              title={"post public"}
              content={systemCount?.totalPostPublic}
              icon={
                <SlackOutlined className="text-5xl text-sky-500 opacity-50" />
              }
            />
          </div>

          {/* media */}
          {mediaList && (
            <MediaSection
              data={mediaList}
              isLoading={mediaLoading}
              className="bg-white col-span-12 p-4 rounded-md shadow-xl mt-8"
            />
          )}
        </div>
      </Spin>
    </WrapperLayout>
  );
};

export default HomePage;
