import publicClient from "../client/public.client";

const personEndpoints = {
    detail : ({ personid }) => `person/${personId}`,
    medias : ({ personid }) => `person/${personId}/medias`
}

const personApi = {
    detail : async ({personId}) => {
        try {
            const response = await publicClient.get(personEndpoints.detail({personId}));
            return {response}
        } catch (err) {
            return {err};
        }
    },

    medias : async ({personId}) => {
        try {
            const response = await publicClient.get(personEndpoints.medias({personId}));
            return {response}
        } catch (err) {
            return {err};
        }
    }
}

export default personApi;