// export default defineNuxtPlugin((nuxtApp) => {})

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import pallet from 'vuetify/lib/util/colors'

const colors = {
  primary: pallet.red.darken1, // #E53935
  secondary: pallet.red.lighten4, // #FFCDD2
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            ...colors,
          }
        },
        dark: {
          dark: true,
          colors: {
            ...colors,
          }
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})
