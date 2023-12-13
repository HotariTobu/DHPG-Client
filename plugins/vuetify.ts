// import 'vuetify/styles'
import '@/styles/main.scss'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

const colors = {
  text: '#003B46',
  accent: '#07575B',
  primary: '#66A5AD',
  secondary: '#C4DFE6',
  skeleton: '#E9E9E9',
  background: '#FFFFFF',
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
