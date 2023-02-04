import privateClient from "../client/private.client";

const reviewEndPoints = {
    list : "reviews",
    add : "reviews",
    remove : ({reviewId}) => `reviews/${reviewId}`
}

const reviewApi = {
    add : async ({
        mediaType,
        mediaCategory,
        mediaTitle,
        mediaPoster,
        content
    }) => {
        try {
            const response = await privateClient.post(reviewEndPoints.add,{
                mediaType,
                mediaCategory,
                mediaTitle,
                mediaPoster,
                content
            });

            return {response};
        } catch (err) {
            return {err}
        }
    },

    remove : async ({reviewId}) => {
        try {
            const response = await privateClient.delete(reviewEndPoints.remove({reviewId}));
            return {response};
        } catch (err) {
            
        }
    },

    getList : async () => {
        try {
            const response = await privateClient.get(reviewEndPoints.list);
            return {response};
        } catch (err) {
            return {err}
        }
    }
}

export default reviewApi;