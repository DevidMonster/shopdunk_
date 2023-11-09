import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_BRANCH, GET_BRANCHS, UPDATE_BRANCH } from "../../../api/branch";

function EditBranch() {
    const { id } = useParams()
    const { data, loading } = useQuery(GET_BRANCH, { variables: { id: parseInt(id!) } })
    const [form] = Form.useForm()
    const [addressData, setAddressData] = useState<any[]>([])
    const [districts, setDistricts] = useState<any[]>([])
    const [updateBranch, { loading: updateLoading }] = useMutation(UPDATE_BRANCH)
    const navigate = useNavigate()

    const getApi = async () => {
        await fetch('https://provinces.open-api.vn/api/?depth=2')
            .then(response => response.json())
            .then(response => setAddressData(response))
            .catch(err => console.error(err))
    }
    console.log(addressData);

    useEffect(() => {
        if (addressData.length > 0) {
            handleSetDistricts(data?.branch.provinceCode)
            form.setFieldsValue({
                code: data?.branch.code,
                provinceCode: data?.branch.provinceCode,
                address: data?.branch.address,
                branchName: data?.branch.branchName
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addressData, form])

    useEffect(() => {
        if (!loading && data?.branch) {
            getApi()
        }
    }, [data, loading])

    const handleSetDistricts = (code: number) => {
        setDistricts([])
        const currentCity = addressData.find((data: any) => data.code === code)
        setDistricts(currentCity.districts)
    }

    const onFail = (values: any) => {
        console.log(values);

    }

    const onFinish = async (values: any) => {
        try {
            const res = await updateBranch({
                variables: {
                    updateBranchInput: {
                        id: parseInt(id!),
                        ...values
                    }
                },
                refetchQueries: [{ query: GET_BRANCHS }, { query: GET_BRANCH, variables: { id: parseInt(id!) } }]
            })

            if (res?.data) {
                message.success('Update successful')
                navigate('/admin/branch')
            }
        } catch (error: any) {
            message.error(error.message)
        }
    };

    return (<div className="w-[80%]">
        <h1 className="text-2xl font-bold">Edit</h1>
        <Form
            form={form}
            style={{ width: '70%', margin: '0 auto' }}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFail}
        >
            <Form.Item
                label="Tỉnh/Thành phố"
                name={'provinceCode'}
                rules={[{ required: true, message: 'Hãy chọn tỉnh/thành phố' }]}
            >
                <Select onChange={(e) => handleSetDistricts(e)} size="large" className="w-[48.5%]" placeholder="Chọn Tỉnh/Thành phố" >
                    {addressData?.map((add: any, index: number) => (
                        <Select.Option key={index} value={add.code}>{add.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Quận/Huyện"
                name={'code'}
                rules={[{ required: true, message: 'Hãy chọn huyện/quận' }]}
            >
                <Select size="large" className="w-[48.5%]" placeholder="Chọn Quận/Huyện" >
                    {districts?.map((district: any, index: number) => (
                        <Select.Option key={index} value={district.code}>{district.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label='Tên chi nhánh'
                name={'branchName'}
                rules={[{ required: true, message: 'Hãy nhập tên chi nhánh' }]}
            >
                <Input placeholder="Nhập tên chi nhánh" />
            </Form.Item>
            <Form.Item
                label='Địa chỉ cụ thể'
                name={'address'}
                rules={[{ required: true, message: 'Hãy nhập địa chỉ cụ thể' }]}
            >
                <Input placeholder="Nhập địa chỉ cụ thể" />
            </Form.Item>
            <Form.Item style={{ margin: '20px 0' }}>
                <div className='w-[30%] flex gap-3'>
                    <Button onClick={() => {
                        form?.resetFields()
                        navigate('/admin/branch')
                    }
                    } type="text" className='border-[1px] border-black' htmlType="button">
                        Cancel
                    </Button>
                    <Button loading={updateLoading} className='bg-blue-400' type="primary" htmlType="submit">
                        Save
                    </Button>
                </div>
            </Form.Item>
        </Form>
    </div>);
}

export default EditBranch;