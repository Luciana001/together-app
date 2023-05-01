import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import {createPinia} from 'pinia';


const pinia = createPinia();
createInertiaApp({
    id:'app',
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.vue'
            , { eager: true })
        return pages[`./Pages/${name}.vue`]
    },
    setup({ App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(pinia)  
            .mount('#app')
    },
})

