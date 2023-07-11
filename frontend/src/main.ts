import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { plugin } from './plugins/api';
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

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
app.use(plugin);
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
