// import 'vuetify/styles'
import '@/styles/main.scss'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { VBtn } from 'vuetify/components/VBtn'
import { VTextField } from 'vuetify/components/VTextField'

const colors = {
  text: '#003B46',
  primary: '#66A5AD',
  secondary: '#C4DFE6',
  background: '#FFFFFF',
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
    aliases: {
      Button: VBtn,
      FormField: VTextField,
    },
    defaults: {
      Button: {
        rounded: 'pill',
        width: 200,
        height: 50,
      },
      VTextField: {
        color: 'primary',
      },
      VTextarea: {
        color: 'primary',
      },
      FormField: {
        color: 'primary',
        variant: 'solo',
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })
  app.vueApp.use(vuetify)
})
