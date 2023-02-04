import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
    name : "AuthModel",
    initialState : { 
        authModalSlice : false
    },
    reducers : {
        setAuthModalOpen : (state,action) => {
            state.setAuthModalOpen = action.payload;
        }
    }
});

export const {
    setAuthModalOpen
} = authModalSlice.actions;

export default authModalSlice.reducer;