import {configureStore} from "@reduxjs/toolkit";
import themeReducer from "./themeSlicer";
import reducer from "./themeSlicer";

const store =configureStore({
   reducer:{
    theme:themeReducer
   }
})

export default store;