import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload, UploadFile, message } from "antd";
import { useState } from "react";

interface IProps {
    name: number;
}

function UploadImage({ name }: IProps) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleBeforeUpload = (file: UploadFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
        }
        const isLt10M = (file.size || 0) / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Kích thước hình ảnh không được vượt quá 10MB!');
        }

        return isJpgOrPng && isLt10M;
    };

    const handleOnChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setFileList(fileList);
    };


    return <div>
        <Form.Item
            name={[name, "images"]}
            label="Images"
            rules={[{ required: true, message: `bạn phải chọn ảnh` }]}
        >
            <Upload
                name="images"
                beforeUpload={handleBeforeUpload}
                customRequest={(option) => {
                    setTimeout(() => option.onSuccess!(option?.file), 0)
                }}
                onChange={handleOnChange}
                listType="picture-circle"
                fileList={fileList}
            >
                <Button className='border-[0]' icon={<UploadOutlined />}></Button>
            </Upload>
        </Form.Item>
    </div>;
}

export default UploadImage;