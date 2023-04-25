import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            id:0,
            firstName: 'Lucia',
            lastName: 'Brancato',
            isRegistered: false,
        }
    }
})