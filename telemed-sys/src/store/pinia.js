import { defineStore } from 'pinia'

export const useTelemedStore = defineStore('telemed', {
    state: () => ({
        token: '',
        has_logged_in: false
    }),
    actions: {
        setToken(token) {
            this.token = token;
            this.has_logged_in = true;
        },
        resetStore() {
            this.token = '';
            this.has_logged_in = false;
        }
    },
    persist: true
})