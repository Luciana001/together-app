import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useLocationStore = defineStore({
    id: 'location',
    state: () => ({
        position:null,
    }),
    actions: {
        async fetchPosition(){
            try{
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                });
                this.setPosition(position);
            } catch(error) {
                console.error('error', error)
            }
        },
        setPosition(position){
            this.position = position;
        },
    },
});
