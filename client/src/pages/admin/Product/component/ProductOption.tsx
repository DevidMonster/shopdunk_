import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal, Card, Input, Space, Form, FormInstance } from "antd";
import { useState } from "react";

interface IProps {
    form: FormInstance<unknown>;
    optionData: unknown[],
    setOptionData: React.Dispatch<React.SetStateAction<unknown[]>>
}

function ProductOption({ form, optionData, setOptionData }: IProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className='px-[40px]'>
            <h2 className='font-bold text-xl'>Product Option</h2>
            <div className='p-5'>
                <Button onClick={() => setOpen(true)} className='bg-[#1677ff] text-white'>Option Manager</Button><span>+{optionData.length || 0} options</span>
                <Modal
                    title="Add Product Option"
                    centered
                    open={open}
                    onCancel={() => setOpen(false)}
                    width={650}
                    footer={[
                        <Button onClick={() => setOpen(false)}>
                            Cancel
                        </Button>,
                        <Button className='bg-[#1677ff] text-white' onClick={() => {
                            const options = form.getFieldValue('options')
                            setOptionData([...options])
                            setOpen(false)
                        }}>
                            Add
                        </Button>
                    ]}
                >
                    <Form.List name="options">
                        {(fields, { add, remove }) => (
                            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        title={`Option ${field.name + 1}`}
                                        key={field.key}
                                        extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        }
                                    >
                                        <Form.Item label="Option Name" name={[field.name, 'optionName']}>
                                            <Input />
                                        </Form.Item>

                                        {/* Nest Form.List */}
                                        <Form.Item label="option Value" >
                                            <Form.List name={[field.name, 'optionValues']}>
                                                {(subFields, subOpt) => (
                                                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                        {subFields.map((subField) => (
                                                            <Space key={subField.key}>
                                                                <Form.Item noStyle name={[subField.name, 'valueName']}>
                                                                    <Input placeholder="value" />
                                                                </Form.Item>
                                                                <CloseOutlined
                                                                    onClick={() => {
                                                                        subOpt.remove(subField.name);
                                                                    }}
                                                                />
                                                            </Space>
                                                        ))}
                                                        <Button type="dashed" onClick={() => subOpt.add()} block>
                                                            + Add value
                                                        </Button>
                                                    </div>
                                                )}
                                            </Form.List>
                                        </Form.Item>
                                    </Card>
                                ))}

                                <Button type="dashed" onClick={() => add()} block>
                                    + Add Item
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Modal>
            </div>
        </div>
    );
}

export default ProductOption;