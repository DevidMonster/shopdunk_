import { message } from 'antd';
import { instance } from './instance';

export const loginApi = async (user: unknown): Promise<{ data: { accessToken: string, data: unknown } } | any> => {
    try {
        return await instance.post<unknown, { data: { accessToken: string, data: unknown } }>('/auth/login', user)
    } catch (error: any) {
        message.error(error.response.data.message);
        return { }
    }
};

export const signupApi = async (user: unknown): Promise<{ data: { accessToken: string, data: unknown } } | any> => {
    try {
    return await instance.post<unknown, { data: { accessToken: string, data: unknown } }>('/auth/register', user)
} catch (error: any) {
    message.error(error.response.data.message);
    return { }
}
};

export const getToken = async () => {
    return await instance.get('/auth/refresh', { withCredentials: true });
};
export const clearToken = async () => {
    return await instance.delete('/auth/clear', { withCredentials: true });
};