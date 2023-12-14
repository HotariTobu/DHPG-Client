<script lang="ts" setup>
import { mdiAccount, mdiMagnify } from '@mdi/js'

const axios = useAxios()
const { updateQuery } = useQuery()
const router = useRouter()
const user = useUser()

const drawer = ref(false)
const searchParam = ref('')

const goHome = () => {
  router.push('/')
}

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
  <v-app-bar
    color="primary"
    scroll-behavior="hide"
  >
    <template #prepend>
      <Text>
        <a
          class="logo text-h4 ms-4 me-6 text-logo"
          href="/"
          @click.prevent="goHome"
        >iSign</a>
      </Text>
    </template>

    <v-hover>
      <template #="{ isHovering, props }">
        <v-text-field
          bg-color="secondary"
          :rounded="true"
          v-bind="props"
          v-model="searchParam"
          placeholder="Search here..."
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
      <v-btn
        class="mx-4"
        color="accent"
        variant="flat"
        to="/post"
      >
        <Text color="secondary">
          post
        </Text>
      </v-btn>
      <div @click="drawer = !drawer">
        <v-app-bar-nav-icon
          v-if="user === null"
          color="secondary"
        />
        <v-avatar
          v-else
          class="cursor-pointer hover:opacity-80"
          :image="user.icon"
        />
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
      <v-list-item :to="`/user/${user.userId}`">My page</v-list-item>
      <v-list-item to="/post">Post</v-list-item>
      <v-list-item @click-once="logout">Logout</v-list-item>
    </div>
    <!-- <v-divider />
    <v-list-item to="/verify">Verify</v-list-item> -->
  </v-navigation-drawer>

  <Text>
    <v-main class="mb-16">
      <slot />
    </v-main>
  </Text>
</template>

<style scoped>
.logo {
  color: inherit;
  user-select: none;
  text-decoration: none;
}
</style>
