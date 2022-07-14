import {createApp} from 'vue'
import App from '@/App.vue'
import '@/index.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faAngleUp} from "@fortawesome/free-solid-svg-icons/faAngleUp";
import {faDeleteLeft} from "@fortawesome/free-solid-svg-icons/faDeleteLeft";

library.add(faAngleUp,faDeleteLeft);

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')