import jsonwebtoken from 'jsonwebtoken';
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const tokenDecode = (res) => {
    try {
        const bearerHeader = req.handers["authorization"];
        if(bearerHeader){
            const token = bearerHeader.split(" ")[1];
            return jsonwebtoken.verify(
                token,
                process.env.TOKEN_SECRET
            );
        }
        return false;
    } catch {
        return false;
    }
};

const auth = async (req,res,next) => {
    const tokenDecoded = tokenDecode(req);

    if(!tokenDecode) return responseHandler.unauthorize(res);

    const user = await userModel.findById(tokenDecode.data);

    if(!user) return responseHandler.unauthorize(res);

    req.user = user;
    next();
};

export default { auth, tokenDecode };