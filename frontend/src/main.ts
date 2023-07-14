import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { plugin } from './plugins/api';
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

const vuetify = createVuetify({
    components,
    directives,
})

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faPhoneFlip,
    faLocationPin,
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPhoneFlip)
library.add(faLocationPin)

const app = createApp(App)
    .component('fai', FontAwesomeIcon)
    .component('DatePicker', DatePicker)
app.use(plugin);
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Notifications)

app.mount('#app')
