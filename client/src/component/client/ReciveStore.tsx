import { useQuery } from "@apollo/client";
import { Select, Form } from "antd";
import { useEffect, useState } from "react";
import { GET_BRANCHS } from "../../api/branch";

function ReciveStore() {
    const [addressData, setAddressData] = useState<any[]>([])
    const [districts, setDistricts] = useState<any[]>([])
    const [branchs, setBranchs] = useState<any[]>([])
    const { data } = useQuery(GET_BRANCHS)
    const getApi = async () => {
        await fetch('https://provinces.open-api.vn/api/?depth=2')
            .then(response => response.json())
            .then(response => setAddressData(response))
            .catch(err => console.error(err))
    }

    const handleSetDistricts = (code: number) => {
        setDistricts([])
        const currentCity = addressData.find((data: any) => data.code === code)
        setBranchs([])
        setDistricts(currentCity.districts)
    }

    const handleSetBranches = (code: number) => {
        setBranchs([])
        const currentDistrict = districts.find((data: any) => data.code === code)
        const currentBranch = data?.branchs.filter((branch: any) => {
            if (branch.code === currentDistrict.code && branch.provinceCode === currentDistrict.province_code) {
                return branch
            }
        })
        setBranchs(currentBranch)
    }

    useEffect(() => {
        getApi()
    }, [])
    return (
        <>
            <Select onChange={(e) => handleSetDistricts(e)} size="large" className="w-[48.5%]" placeholder="Chọn Tỉnh/Thành phố" >
                {addressData?.map((add: any, index: number) => (
                    <Select.Option key={index} value={add.code}>{add.name}</Select.Option>
                ))}
            </Select> 
            <Select onChange={(e) => handleSetBranches(e)} size="large" className="w-[48.5%]" placeholder="Chọn Quận/Huyện" >
                {districts?.map((district: any, index: number) => (
                    <Select.Option key={index} value={district.code}>{district.name}</Select.Option>
                ))}
            </Select>
            <Form.Item
                name='address'
                className="w-full"
                rules={[{ required: true, message: 'Bạn phải nhập trường này' }]}
            >
                <Select size="large" className="w-full" placeholder="Chọn địa chỉ cửa hàng" >
                {branchs?.map((branch: any, index: number) => (
                    <Select.Option key={index} value={branch.branchName + ' (' +branch.address+ ')'}>{branch.branchName + ' (' +branch.address+ ')'}</Select.Option>
                ))}
                </Select>
            </Form.Item>
        </>
    );
}

export default ReciveStore;