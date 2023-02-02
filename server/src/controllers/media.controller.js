import responseHandler from '../handlers/response.handler';
import tmdbApi from '../tmdb/tmbd.api';

const getList = async (req,res) => {
    try {
        const {page} = req.query;
        const {mediaType,mediaCategory} = req.params;
        const response = await tmdbApi.mediaList({mediaType,mediaCategory,page});
        return responseHandler.ok(res,response);
    } catch {
        responseHandler.error(res);
    }
}

const getGenres = async (req,res) => {
    try {
        const { mediaType } = req.params;
        const response = await tmdbApi.mediaGenres({mediaType});
        return responseHandler.ok(res,response);
    } catch  {
        responseHandler.error(res);
    }
}

export default {getList,getGenres};