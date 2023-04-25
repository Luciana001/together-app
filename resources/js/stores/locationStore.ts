import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useLocationStore = defineStore("location", () => {
    const location = ref<object>({});

    const fetchLocation = async () => {

        const coords: any = async () => {
            return new Promise((resolve, error) =>
                navigator.geolocation.getCurrentPosition((pos) => {
                    let latitude = pos.coords.latitude;
                    let longitude = pos.coords.longitude;
                    resolve({ latitude, longitude });
                })
            );
        };

        try {
            const data = await axios.get(
                `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&appid=b68afb69c2607c15cb4f6bf022f17e25`
            );
            location.value = data.data[0];
        } catch (error) {
            console.log(error);
        }
    };

    return { location, fetchLocation };
});