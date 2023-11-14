<script lang="ts" setup>
const router = useRouter()

const drawer = ref(false)
const searchParam = ref('')

const reset = () => {
  searchParam.value = ''
}

const gotoHome = () => {
  reset()
  router.push('/')
}

const search = () => {
  const param = searchParam.value
  if (param === '') {
    return
  }

  const url = `search?=${param}`
  router.push(url)
}
</script>

<template>
  <v-navigation-drawer v-model="drawer" location="right" temporary>
    <nuxt-link to="/sign-up">Sign Up</nuxt-link>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-title @click="gotoHome">iSign</v-app-bar-title>
    <v-text-field v-model="searchParam" @click:append-inner="search" label="search" append-inner-icon="mdi-magnify"
      density="compact" variant="outlined" single-line hide-details clearable />
    <v-app-bar-nav-icon @click="drawer = !drawer" />
  </v-app-bar>

  <v-main>
    <slot />
  </v-main>
</template>

<style scoped></style>
