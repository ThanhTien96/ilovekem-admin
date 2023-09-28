import { PostType } from "@type/postType";
import { ButtonApp, WrapperLayout } from "components/shared";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "reduxStore";
import { thunkGetAllPost } from "reduxStore/common/post/postAsyncThunk";
import PostCart from "./partials/PostCart";
import { Empty, Pagination, Drawer, message, Spin } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { PostForm } from "./partials";
import { PostFormValueType } from "./partials/PostForm";
import { PostService } from "services/postService";
import { setPagePostLoading } from "reduxStore/common/post/postSlice";


const PostPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { postList, pageLoading } = useAppSelector(
    (state) => state.common.postSlice
  );

  /** component state */
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openFormUpdate, setOpenFormUpdate] = useState<boolean>(false);
  const [detailPost, setDetailPost] = useState<PostType>();
  useEffect(() => {
    dispatch(thunkGetAllPost({ page: 1, keyWord: "" }));
  }, []);

  /** handle create post */
  const handleCreatePost = async (value: PostFormValueType) => {
    setOpenForm(false);
    dispatch(setPagePostLoading(true));

    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("content", value.content);
    formData.append("subContent", value.subContent);

    if (value.media) {
      value.media.forEach((image: any) => {
        formData.append(`media`, image.originFileObj);
      });
    }

    try {
      const res = await PostService.createPost(formData);
      if (res.status === 200) {
        message.success("create post successfully");
        dispatch(thunkGetAllPost({ page: 1, keyWord: "" }));
      }
    } catch (err) {
      message.error("create post faild");
    } finally {
      dispatch(setPagePostLoading(false));
    }
  };

  /** handle delete post */
  const handleDeletePost = async (id: string) => {
    dispatch(setPagePostLoading(true));
    try {
      const res = await PostService.deletePost(id);
      if (res.status === 200) {
        message.success(res.data.message);
        dispatch(
          thunkGetAllPost({ page: postList?.currentPages || 1, keyWord: "" })
        );
      }
    } catch (err) {
      message.error("delete post faild");
    } finally {
      dispatch(setPagePostLoading(false));
    }
  };

  /** handle update */
  const handleInitializeUpdate = async (id: string) => {
    dispatch(setPagePostLoading(true));
    try {
      const res = await PostService.getDetailPost(id);
      if (res.status === 200) {
        await setDetailPost(res.data);
        setOpenFormUpdate(true);
      }
    } catch (err) {
      message.error(`can not get detail post ${id}`);
    } finally {
      dispatch(setPagePostLoading(false));
    }
  };

  /** udpate post */
  const handleUpdatePost = async (value: PostFormValueType) => {
    if (detailPost) {
      setOpenFormUpdate(false);
      dispatch(setPagePostLoading(true));

      const formData = new FormData();
      formData.append("title", value.title);
      formData.append("content", value.content);
      formData.append("subContent", value.subContent);

      if (value.media && value.media !== null) {
        value.media.forEach((image: any) => {
          formData.append(`media`, image.originFileObj);
        });
      }
      try {
        const res = await PostService.updatePost(detailPost._id, formData);

        if (res.status === 200) {
          message.success("update post successfully");
          dispatch(
            thunkGetAllPost({ page: postList?.currentPages || 1, keyWord: "" })
          );
        }
      } catch (err) {
        message.error("update post faild");
      } finally {
        dispatch(setPagePostLoading(false));
      }
    }
  };

  /** handle public post */
  const handlePublicPost = async (id: string, isPublic: boolean) => {
    dispatch(setPagePostLoading(true));
    try {
      const res = await PostService.publicPost(id, isPublic);
      if (res.status === 200) {
        message.success(res.data.message);
        dispatch(
          thunkGetAllPost({ page: postList?.currentPages || 1, keyWord: "" })
        );
      }
    } catch (err) {
      message.error("public post faild");
    } finally {
      dispatch(setPagePostLoading(false));
    }
  };
  return (
    <div>
      <Spin spinning={pageLoading}>
        <WrapperLayout>
          <div className="flex justify-between mb-8">
            <h1 className="text-xl font-semibold">Post</h1>
            <div>
              <ButtonApp
                onClick={() => {
                  setOpenForm((e) => !e);
                }}
                children={
                  <div>
                    <AppstoreAddOutlined className="mr-2" /> Add Post
                  </div>
                }
              />
            </div>
          </div>
          {/* post all */}
          <div className="grid grid-cols-12 gap-8">
            {postList &&
            Array.isArray(postList.data) &&
            postList?.data?.length > 0 ? (
              postList?.data?.map((ele: PostType) => {
                return (
                  <PostCart
                    onPublic={handlePublicPost}
                    className="col-span-12 xl:col-span-6"
                    onUpdate={handleInitializeUpdate}
                    onDelete={handleDeletePost}
                    key={ele._id}
                    data={ele}
                  />
                );
              })
            ) : (
              <div className="col-span-12 flex items-center justify-center">
                <Empty />
              </div>
            )}
          </div>
          {postList && (
            <div className=" flex justify-center items-center mt-8 mb-14">
              <Pagination
                onChange={(e) => {
                  dispatch(thunkGetAllPost({ page: e, keyWord: "" }));
                }}
                defaultCurrent={1}
                total={postList?.total}
              />
            </div>
          )}
        </WrapperLayout>

        {/* drawer create */}
        <Drawer
          title="Add Post"
          placement="right"
          onClose={() => setOpenForm(false)}
          open={openForm}
          width={"40%"}
        >
          <PostForm
            onFinish={(value: PostFormValueType) => handleCreatePost(value)}
          />
        </Drawer>

        {/* update */}
        <Drawer
          title="Update Post"
          placement="right"
          onClose={() => setOpenFormUpdate(false)}
          open={openFormUpdate}
          width={"40%"}
        >
          {detailPost ? (
            <PostForm
              defaultVal={detailPost}
              onFinish={(value: PostFormValueType) => handleUpdatePost(value)}
            />
          ) : (
            <Empty />
          )}
        </Drawer>
      </Spin>
    </div>
  );
};

export default PostPage;
