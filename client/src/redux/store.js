import { configureStore } from "@reduxjs/toolkit";
import appStateSlice  from "./features/appStateSlice";
import authModelSlice from "./features/authModelSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import themeModalSlice from "./features/themeModalSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
    reducer : {
        user : userSlice,
        themeMode : themeModalSlice,
        authModel : authModelSlice,
        globalLoading : globalLoadingSlice,
        appState : appStateSlice
    }
});

export default store;