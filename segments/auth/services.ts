import { useApiCall } from "~/segments/utils"

const registerCandidate = async (payload :SignUpPayload) :Promise<SignUpResponse> => {
    return await useApiCall<SignUpResponse>(`auth/registercandidate`, 'post', payload);
}


export {
    registerCandidate
}
