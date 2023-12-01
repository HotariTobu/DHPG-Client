<script lang="ts" setup>
import { mdiMagnify } from '@mdi/js'

const axios = useAxios()
const { updateQuery } = useQuery()
const router = useRouter()
const user = useUser()

const drawer = ref(false)
const searchParam = ref('')

const search = () => {
  const param = searchParam.value
  if (param === '') {
    return
  }

  updateQuery('q', param, '/search')
}

const logout = async () => {
  const res = await axios.get('/logout')

  if (res.status === 200) {
    user.value = null
  }
  else {
    throwResponseError(res)
  }
}
</script>

<template>
  <v-app-bar scroll-behavior="hide">
    <template #prepend>
      <v-btn
        to="/"
        variant="plain"
      >
        iSign
      </v-btn>
    </template>

    <v-hover>
      <template #="{ isHovering, props }">
        <v-text-field
          v-bind="props"
          v-model="searchParam"
          label="search"
          @click:append-inner="search"
          @keyup.enter="search"
          :append-inner-icon="mdiMagnify"
          variant="outlined"
          density="compact"
          single-line
          hide-details
          clearable
        />
      </template>
    </v-hover>

    <template #append>
      <div @click="drawer = !drawer">
        <v-app-bar-nav-icon v-if="user === null" />
        <v-avatar
          v-else
          class="clickable"
          :image="user.icon"
        ></v-avatar>
      </div>
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
    order="-1"
  >
    <v-list-item
      title="iSign"
      subtitle="Image SNS"
    ></v-list-item>
    <v-divider />
    <div v-if="user === null">
      <v-list-item to="/sign-up">Sign Up</v-list-item>
      <v-list-item to="/login">Login</v-list-item>
    </div>
    <div v-else>
      <v-list-item to="/post">Post</v-list-item>
      <v-list-item @click-once="logout">Logout</v-list-item>
    </div>
    <v-divider />
    <v-list-item to="/verify">Verify</v-list-item>
  </v-navigation-drawer>

  <v-main class="ma-4">
    <slot />
  </v-main>
</template>

<style scoped>
.clickable:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
