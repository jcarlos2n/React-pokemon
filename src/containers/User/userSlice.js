import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jwt-decode';

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        token: ""
    },
    reducers:{
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state, action) => {
            return{
                ...state.initialState

            }
        },register: (state, action) => {
            return {
                ...state,
                isRegister: true,
                successMessage: 'Te has registrado correctamente'
            }
        }
    },
});

export const loginUser = (body) => async (dispatch) => {
    try{
        const user = await axios.post('http://localhost:3001/users/login',body);
        let decode = jwt(user.data.token);
        
        if(user.status === 200){
            dispatch(login({
                ...decode,
                token: user.data.token
            }))
        }

    }catch (error){
        console.log(error)
    }
};

export const logOut = () => (dispatch) => {
    dispatch(logout());
};

export const registerUser = (nick, password) => async (dispatch) => {
    try {
        
        const user = await axios.post('http://localhost:3001/users/signup',
        {
            nick: nick,
            password: password
        })

        let response = user
        if(response.status === 200){
            dispatch(register(response.data))
        } 
    } catch (error) {
        console.log(error)
    }
}

export const {login, logout, register } = userSlice.actions
export const userData = (state) =>state.user
export default userSlice.reducer;