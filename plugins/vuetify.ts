// export default defineNuxtPlugin((nuxtApp) => {})
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import pallet from 'vuetify/lib/util/colors'

const colors = {
  primary: pallet.red.darken1, // #E53935
  secondary: pallet.red.lighten4, // #FFCDD2
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
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
