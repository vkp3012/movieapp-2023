import { Box } from "@mui/material";
import { Outlet } from "react-router-dom"
// import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import AuthModel from "../common/AuthModel";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import userApi from "../../api/modules/user.api";
import {setUser} from "../../redux/features/userSlice"
const MainLayout = () => {
    const dispatch = useDispatch();
    // const { user } = useSelector((state) => state.user)

    useEffect(()=>{
      const authUser = async () => {
        const { response, err} = await userApi.getInfo();
        if (response) dispatch(setUser(response));
        if(err) dispatch(setUser(null));
      };
      authUser();
    },[dispatch]);
    
  return (
    <>
      {/* global_loading */}
        <GlobalLoading />
      {/* global_loading */}

      {/* login loading */}
        <AuthModel />
      {/* login loading */}

        <Box display="flex" minHeight="100vh">
            {/* header */}
            <Topbar />
            {/* header */}

            {/* main */}
            <Box
                component="main"
                flexGrow={1}
                overflow = "hidden"
                minHeight = "100vh"
            >
                <Outlet/>
            </Box>
            {/* main */}

            {/* footer */}
            {/* <Footer/> */}
            {/* footer */}
        </Box>
    </>
  )
}

export default MainLayout
