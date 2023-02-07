import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmbd.config";
import NavigationSwiper  from "./NavigationSwiper";

const BackdropSlide = ({ backdrops }) => {
    return (
        <NavigationSwiper>
            {[...backdrops].splice(0,10).map((item,index)=>(
                <SwiperSlide>
                    <Box sx={{
                        paddingTop: "60%",
                        backgroundPosition: "top",
                        backgroundSize: "cover",
                        backgroundImage: `url(${tmdbConfigs.backdropPath(item.file_path)})`
                    }}/>
                </SwiperSlide>
            ))}
        </NavigationSwiper>
    )
}

export default BackdropSlide;