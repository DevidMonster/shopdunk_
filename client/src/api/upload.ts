import { UploadFile } from 'antd';
import { instance } from './instance';

export const uploadImages = async (files: UploadFile[]) => {
    const images: string[] = []
    console.log(files);
    

    for (const file of files) {
        if (file.url) {
            images.push(file.url)
        } else {
            const formData = new FormData();
            formData.append('image', file.originFileObj as File);
            const image = await instance.post<unknown, { data: { imageUrl: string } }>('/firebase/upload', formData, { headers: { 'Content-Type': ' multipart/form-data' } });
            images.push(image.data.imageUrl);
        }
    }
    return images
};