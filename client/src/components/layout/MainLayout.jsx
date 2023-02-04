import { Box } from "@mui/material";
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <>
      {/* global_loading */}
      {/* global_loading */}

      {/* login loading */}
      {/* login loading */}

        <Box display="flex" minHeight="100vh">
            {/* header */}
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
            {/* footer */}
        </Box>
    </>
  )
}

export default MainLayout
