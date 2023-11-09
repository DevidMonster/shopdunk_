import { useMutation } from "@apollo/client";
import { Button, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_BRANCH, GET_BRANCHS } from "../../../api/branch";


function AddBranch() {
    const [addressData, setAddressData] = useState<any[]>([])
    const [districts, setDistricts] = useState<any[]>([])
    const [createBranch, { loading }] = useMutation(CREATE_BRANCH)
    const navigate = useNavigate()

    const getApi = async () => {
        await fetch('https://provinces.open-api.vn/api/?depth=2')
            .then(response => response.json())
            .then(response => setAddressData(response))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getApi()
    }, [])

    const handleSetDistricts = (code: number) => {
        setDistricts([])
        const currentCity = addressData.find((data: any) => data.code === code)
        setDistricts(currentCity.districts)
    }

    const onFinish = async (values: any) => {
        try {
            const res = await createBranch({
                variables: {
                    createBranchInput: {
                        ...values
                    }
                },
                refetchQueries: [{ query: GET_BRANCHS }]
            })

            if(res?.data) {
                message.success('Create successful')
                navigate('/admin/branch')
            }
        } catch (error: any) {
            message.error(error.message)
        }
    };

    return (<div className="w-[80%]">
        <h1 className="text-2xl font-bold">Create New</h1>
        <Form
            style={{ width: '70%', margin: '0 auto' }}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
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
                <Button loading={loading} className='bg-blue-400' type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    </div>);
}

export default AddBranch;