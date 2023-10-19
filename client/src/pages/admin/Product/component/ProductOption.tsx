import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal, Card, Input, Space, Form, FormInstance } from "antd";
import { useState } from "react";

interface IProps {
    form: FormInstance<unknown>;
    setOptionData: React.Dispatch<React.SetStateAction<unknown[]>>,
    error: string;
}

function ProductOption({ form, setOptionData, error }: IProps) {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState<boolean>(false)

    const checkValid = (values: any[]) => {
        let isValid = true;
        
        if(!values || values.length == 0) {
            return isValid
        }
        values.map((value) => {
            if(!value || value?.optionName === "") {
                return isValid =false;
            }

            if(!value.optionValues || value?.optionValues?.length == 0) {
                return isValid =false;
            }

            value?.optionValues?.map((v) => {
                if(!v || v.valueName === "") {
                    return isValid =false;
                }
            })
        })

        return isValid;
    }

    return (
        <div className='px-[40px]'>
            <h2 className='font-bold text-xl'>Product Option</h2>
            <div>
                {!disabled && form && form?.getFieldValue('options')?.map((option: any, index: number) => (
                    <div key={index} className="p-5 flex gap-2">
                        <h3 className="w-[20%] border-r-[1px] border-gray-400">{option.optionName}</h3>
                        <p className="flex-1">{option.optionValues.map((value: any) => value.valueName).join(", ")}</p>
                    </div>
                ))}
            </div>
            <div className='p-5'>
                <Button onClick={() => setOpen(true)} className='bg-[#1677ff] text-white'>Option Manager</Button><span>+{form && form?.getFieldValue('options')?.length || 0} options</span>
                <p className="text-red-500">{error}</p>
                <Modal
                    title="Add Product Option"
                    centered
                    open={open}
                    onCancel={() => setOpen(false)}
                    width={650}
                    footer={[
                        <span className="text-red-500 mr-2">{disabled ? 'You need to fill full field' : ''}</span>,
                        <Button onClick={() => setOpen(false)}>
                            Cancel
                        </Button>,
                        <Button htmlType="submit" className='bg-[#1677ff] text-white' onClick={() => {
                            const valid = checkValid(form?.getFieldValue('options') || undefined)
                            setDisabled(!valid)
                            console.log(valid);
                            
                            if(valid) {
                                const options = form.getFieldValue('options') || []
                                setOptionData([...options])
                                setOpen(false)
                            }
                        }}>
                            Add
                        </Button>
                    ]}
                >
                    <Form.List name="options"
                    >
                        {(fields, { add, remove }) => (
                            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                {fields.map((field, index) => (
                                    <Card
                                        size="small"
                                        title={`Option ${field.name + 1}`}
                                        key={index}
                                        extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        }
                                    >
                                        <Form.Item label="Option Name" name={[field.name, 'optionName']} rules={[{ required: true, message: 'Please input option name!' }]}>
                                            <Input />
                                        </Form.Item>

                                        {/* Nest Form.List */}
                                        <Form.Item label="option Value" >
                                            <Form.List name={[field.name, 'optionValues']}>
                                                {(subFields, subOpt) => (
                                                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                        {subFields.map((subField, index) => (
                                                            <Space key={index}>
                                                                <Form.Item noStyle name={[subField.name, 'valueName']} rules={[{ required: true, message: 'Please input value name!' }]}>
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