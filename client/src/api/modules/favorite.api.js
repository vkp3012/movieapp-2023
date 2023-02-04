import privateClient from "../client/private.client";

const favoriteEndPoints = {
    list : "user/favorites",
    add : "user/favorites",
    remove : ({ favoriteId }) => `user/favorites/${favoriteId}`
};

const favoriteApi = {

    //find the list
    getList : async () => {
        try {
            const response = await privateClient.get(favoriteEndPoints.list);

            return {response}
        } catch (err) {
            return {err};
        }
    },

    //add favorite list
    add : async ({
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate
    }) => {
        try {
            const response = await privateClient.post(
                favoriteEndPoints.add,
                {
                    mediaId,
                    mediaType,
                    mediaTitle,
                    mediaPoster,
                    mediaRate
                }
            )

            return {response};
        } catch (err) {
            return {err};
        }
    },

    //remove the favorite list...
    remove : async ({favoriteId}) => {
        try {
            const response = await privateClient.delete(favoriteEndPoints.remove({favoriteId}));
            return {response};
        } catch (err) {
            return {err};
        }
    }
};

export default favoriteApi