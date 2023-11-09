import React, { useEffect, useState } from "react";
import { Form, Input, Skeleton } from "antd";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  COMMENT_ADDED_SUBSCRIPTION,
  CREATE_COMMENT,
  GET_COMMENT_BY_PRODUCT,
} from "../../../api/comment";

type IProps = {
  dataProductID: any;
};

const Comment = ({ dataProductID }: IProps) => {
  // const idProduct = parseInt(dataProductID);
  const [dataCmt, setDataCmt] = useState<any>([]);
  const [parentId, setParentId] = useState(null);
  const [form] = Form.useForm();
  const { data: cmtByProduct, loading: loadCmt } = useQuery(
    GET_COMMENT_BY_PRODUCT,
    {
      variables: { id: parseInt(dataProductID) },
    }
  );
  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      {
        query: GET_COMMENT_BY_PRODUCT,
        variables: { id: parseInt(dataProductID) },
      },
    ],
  });
  const { data: dataSubscription } = useSubscription(
    COMMENT_ADDED_SUBSCRIPTION
  );

  useEffect(() => {
    if (cmtByProduct?.commentByProduct.length > 0) {
      setDataCmt(cmtByProduct?.commentByProduct);
      console.log("data", dataCmt);
    }
  }, [cmtByProduct?.commentByProduct]);

  useEffect(() => {
    if (dataSubscription?.commentAdded) {
      setDataCmt(dataSubscription?.commentAdded);
    }
  }, [dataSubscription?.commentAdded]);

  console.log("data1", dataCmt);
  console.log("dataSubscription1", dataSubscription);

  const onSetParent = (parent: any) => {
    setParentId(parent?.id);
    // setNamesetParent(`<strong>${parent?.name}</strong>`);
    form.setFieldsValue({ content: `@${parent?.name}` });
    //
  };

  const onFinish = (values: any) => {
    // console.log("Success:", values);
    const data = {
      name: values.name,
      information: values.information,
      content: values.content,
      productId: parseInt(dataProductID),
      parent_comment: parentId,
    };
    createComment({
      variables: {
        createCommentInput: data,
      },
    }).then(() => {
      form.resetFields();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-4 border rounded-xl bg-white">
      <div className="text-2xl border-b-2  font-semibold pb-3">Bình luận</div>
      <div className="flex">
        <div className="p-5  border-r">
          <div>
            <div className="font-semibold">Viết bình luận của bạn</div>
          </div>
          <div className="w-96">
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              // defaultValue={{ content: nameParent }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div>Tên của bạn</div>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>

              <div>Email hoặc số điện thoại</div>
              <Form.Item
                name="information"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <div>Nội dung bình luận</div>
              <Form.Item
                name="content"
                rules={[
                  { required: true, message: "Please input your comment!" },
                ]}
              >
                <Input
                // dangerouslySetInnerHTML={{ __html: nameParent }}
                // defaultValue={nameParent}
                />
              </Form.Item>

              {/* <Form.Item >
                <Button className="bg-blue-500 text-white font-semibold" size="large" type="default" htmlType="submit">
                  Gửi
                </Button>
              </Form.Item> */}
              <button
                className="bg-blue-500 text-white rounded-xl font-semibold px-14 py-2"
                type="submit"
              >
                Gửi
              </button>
            </Form>
          </div>
        </div>
        <div className="flex justify-center items-start p-5">
          {!loadCmt ? (
            <div className="flex flex-col items-start">
              {dataCmt?.map((comment: any) => (
                <div className="flex flex-col items-start">
                  <div className="flex justify-center items-start my-1">
                    <button>
                      <img
                        className="w-[50px] h-[45px] rounded-full"
                        src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                        alt=""
                      />
                    </button>
                    <div className="ml-4">
                      <div className="bg-slate-100 px-2 rounded-lg p-1">
                        <div className="font-semibold text-base ">
                          {comment?.name}
                        </div>
                        <div>{comment?.content}</div>
                      </div>
                      <div className=" mt-1 ml-1">
                        <button className="text-xs">Thích</button>
                        <button
                          onClick={() => onSetParent(comment)}
                          className="text-xs ml-2"
                        >
                          Trả lời
                        </button>
                        {/* Rep cmt */}
                        <div className="flex flex-col items-start mt-2">
                          {comment?.children?.map((rep1: any) => (
                            <div className="flex justify-center items-start my-1">
                              <button>
                                <img
                                  className="w-[50px] h-[45px] rounded-full"
                                  src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                                  alt=""
                                />
                              </button>
                              <div className="ml-4">
                                <div className="bg-slate-100 px-2 rounded-lg p-1">
                                  <div className="font-semibold text-base ">
                                    {rep1?.name}
                                  </div>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: rep1?.content,
                                    }}
                                  ></div>
                                </div>
                                <div className="mt-1 ml-1">
                                  <button className="text-xs">Thích</button>
                                  <button
                                    onClick={() => onSetParent(rep1)}
                                    className="text-xs ml-2"
                                  >
                                    Trả lời
                                  </button>
                                  {/* Rep cmt */}
                                  <div className="flex flex-col items-start mt-1">
                                    {rep1?.children?.map((rep2: any) => (
                                      <div className="flex flex-center items-start my-1">
                                        <button>
                                          <img
                                            className="w-[50px] h-[45px] rounded-full"
                                            src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
                                            alt=""
                                          />
                                        </button>
                                        <div className="ml-4">
                                          <div className="bg-slate-100 px-2 rounded-lg p-1">
                                            <div className="font-semibold text-base ">
                                              {rep2?.name}
                                            </div>
                                            <div>{rep2?.content}</div>
                                          </div>
                                          <div className="mt-1 ml-1">
                                            <button className="text-xs">
                                              Thích
                                            </button>
                                            <button
                                              onClick={() => onSetParent(rep2)}
                                              className="text-xs ml-2"
                                            >
                                              Trả lời
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Skeleton avatar paragraph={{ rows: 4 }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
