import { createSlice } from '@reduxjs/toolkit'

type IAuth = {
    user: any,
    accessToken: string,
}

const initialState: IAuth = {
    user: {},
    accessToken: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        saveTokenAndUser: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        deleteTokenAndUser: (state) => {
            state.accessToken = '';
            state.user = {};
        }
    }
})

export const { saveTokenAndUser, deleteTokenAndUser } = authSlice.actions;

export default authSlice.reducer;