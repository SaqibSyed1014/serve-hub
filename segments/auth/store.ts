import {
    registerCandidate
} from "~/segments/auth/services";

interface AuthState {

}

export const useAuthStore = defineStore('authStore', {
    state: () => ({

    } as AuthState),
    actions: {
        async candidateSignup(payload :SignUpPayload) {
            return await registerCandidate(payload)
                .then(({ error, message }) => {
                    if (Boolean(error)) useNuxtApp().$toast.success(message);
                    return message;
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                        useNuxtApp().$toast.error('This email address is already taken. Please use a different email.');
                    }
                    throw err;
                })
        },
    }
})
