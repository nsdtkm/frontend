/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'
// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
registerPlugins(app)
app.use(pinia)
console.log(pinia)
app.mount('#app')
