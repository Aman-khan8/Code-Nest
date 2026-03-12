import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode:"dark"
}


const themeSlice=createSlice({
    name:"themeChanger",
    initialState,
    reducers:{
        toggleMode:(state)=>{
            state.mode=state.mode==="dark"?"light":"dark"
        }
    }
})

export default themeSlice.reducer
export const{toggleMode}=themeSlice.actions;