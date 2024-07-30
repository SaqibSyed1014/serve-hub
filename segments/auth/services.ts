import { usePayloadUrl } from "~/segments/utils"

const registerCandidate = (payload :SignUpPayload) :Promise<SignUpResponse> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/auth/registercandidate`, {
        method: 'post',
        headers: apiHeaders,
        body: payload
    })
}


export {
    registerCandidate
}
