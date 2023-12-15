<script lang="ts" setup>
import { mdiMagnify, mdiTextBoxPlusOutline } from '@mdi/js'
import { useDisplay } from 'vuetify/lib/framework.mjs';

const axios = useAxios()
const { xs } = useDisplay()
const { updateQuery } = useQuery()
const router = useRouter()
const user = useUser()

const drawer = ref(false)

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
      <a
        class="text-inherit no-underline select-none text-h4 mx-4 text-logo text-text"
        href="/"
        @click.prevent="() => router.push('/')"
      >iSign</a>
    </template>

    <div
      v-if="!xs"
      class="w-100 mx-2"
    >
      <SearchField
        class="ms-auto mb-2"
        :style="{
          maxWidth: '400px',
        }"
        color="secondary"
        @search="param => updateQuery('q', param, '/search')"
      />
    </div>

    <template #append>
      <v-btn
        v-if="xs"
        color="secondary"
        :icon="mdiMagnify"
        to="/search"
      />
      <div
        class="text-secondary"
        @click="() => router.push('/post')"
      >
        <v-btn
          v-if="xs"
          :icon="mdiTextBoxPlusOutline"
        />
        <v-btn
          v-else
          rounded
          variant="outlined"
          text="post"
          :append-icon="mdiTextBoxPlusOutline"
        />
      </div>
      <div @click="drawer = !drawer">
        <v-app-bar-nav-icon
          v-if="user === null"
          color="secondary"
        />
        <v-avatar
          v-else
          class="ms-2 cursor-pointer hover:opacity-80"
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
      to="/"
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
    <v-divider />
    <v-list-item to="/verify">Verify</v-list-item>
  </v-navigation-drawer>

  <div class="text-text">
    <v-main class="mb-16">
      <slot />
    </v-main>
  </div>

  <v-footer class="bg-secondary">
    <div class="mx-auto text-text">
      2023 - DHPG
    </div>
  </v-footer>
</template>
