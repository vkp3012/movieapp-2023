import responseHandler from '../handlers/response.handler';
import reviewModel from '../models/review.model';
import resviewModel from '../models/review.model';

const create = async (res,res) => {
    try {
        const {movieId} = req.params;
        const review = new reviewModel({
            user:req.user.id,
            movieId,
            ...req.body
        });

        await review.save();
        responseHandler.created(res,{
            ...review._doc,
            id:review.id,
            user:req.user
        });
    } catch {
        responseHandler.error(res);
    }
}

const remove = async (res,res) => {
    try {
        const {reviewId} = req.params;
        const review = await resviewModel.findOne({
            _id:reviewId,
            user:req.user.id
        });
        if(!review) return responseHandler.notfound(res);
        await review.remove();
        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
}

const getReviewsOfUser = async (req,res) => {
    try {
        const review = await resviewModel.find({
            user: req.user.id
        }).sort("-createdAt");
        responseHandler.ok(res,review);
    } catch {
        responseHandler.error(res);
    }
}


export default {
    create, remove, getReviewsOfUser
}