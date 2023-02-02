import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller";
import userController from "../controllers/user.controller";
import requestHandler from "../handlers/response.handler";
import userModel from "../models/user.model";
import tokenMiddleware from "../middlewares/token.middleware";

const router = express.Router();

router.post(
    "/signup",

    // username 
    body("username")
        .exists().withMessage("username is required")
        .isLength({min:8}).withMessage("username minmum8 characters")
        .custom(async value => {
            const user = await userModel.findOne({username : value});
            if(user) return Promise.reject("username already used")
        }),

    // password
    body("password")
        .exists().withMessage("password is required")
        .isLength({min:8}).withMessage("password minmum 8 characters"),

    // confirmPassword
    body("confirmPassword")
        .exists().withMessage("confirmPassword is required")
        .isLength({min:8}).withMessage("confirmPassword minmum 8 characters")
        .custom((value, {req}) => {
            if(value !== req.body.password) throw new Error("confirmPassword not Match");
            return true
        }),
        
    // displayName
    body("displayname")
        .exists().withMessage("displayname is required")
        .isLength({min:8}).withMessage("displayName minmum 8 characters"),

    requestHandler.validate,
    userController.signup
);

router.post(
    "/signin",
    body("username")
        .exists().withMessage("username is required")
        .isLength({min:8}).withMessage("username minmum8 characters"),
    
    // password
    body("password")
        .exists().withMessage("password is required")
        .isLength({min:8}).withMessage("password minmum 8 characters"),
    
    requestHandler.validate,
    userController.signin
)

router.put(
    '/update-password',
    // password
    body("password")
        .exists().withMessage("password is required")
        .isLength({min:8}).withMessage("password minmum 8 characters"),
    // password
    body("newPassword")
        .exists().withMessage("newPassword is required")
        .isLength({min:8}).withMessage("password minmum 8 characters")
        .custom((value, {req}) => {
            if(value !== req.body.newPassword) throw new Error("confirmNewPassword not Match");
            return true;
        }),
    
    requestHandler.validate,
    userController.updatePassword
)

router.get(
    "/info",
    tokenMiddleware.auth,
    userController.getInfo
)

router.get(
    "/favorite",
    tokenMiddleware.auth,
    favoriteController.getFavoriteOfUser
)

router.post(
    "/favorites",
    tokenMiddleware.auth,
    body("mediaType")
        .exists().withMessage("mediaType is required")
        .custom(type => ["movie","tv"].includes(type)).withMessage("mediaType invalid"),
    body("mediaId")
        .exists().withMessage("mediaId is required")
        .isLength({min:1}).withMessage("mediaId can not be empty"),
    body("mediaTitle")
        .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
        .exists().withMessage("mediaRate is required"),
    requestHandler.validate,
    userController.addFavorite
)

router.delete(
    '/favorites/:favoriteId',
    tokenMiddleware.auth,
    favoriteController.removeFavorite
);

export default router;