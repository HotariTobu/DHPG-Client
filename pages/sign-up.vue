<script lang="ts" setup>
import type User from '~/schemas/user';

definePageMeta({
  layout: false,
})

const axios = useAxios()
const router = useRouter()
const user = useUser()

const state = reactive({
  name: '',
  email: '',
  password: '',
})

const signUp = async () => {
  const res = await axios.post<User>('/sign-up', toRaw(state))

  if (res.status === 201) {
    user.value = res.data
    router.replace('/')
  }
  else {
    throwResponseError(res)
  }
}
</script>

<template>
  <v-card
    class="mx-2 mx-sm-auto my-auto px-4 px-sm-10 py-10"
    color="secondary"
    :min-width="400"
  >
    <div class="mb-16 text-h2 text-center text-logo">
      sign up
    </div>
    <v-form>
      <v-text-field
        bg-color="white"
        v-model="state.name"
        label="Name"
        required
      />
      <v-text-field
        bg-color="white"
        v-model="state.email"
        label="Email"
        required
      />
      <PasswordField
        bg-color="white"
        v-model="state.password"
        label="Password"
        required
      />
      <div class="d-flex mx-auto w-fit">
        <div class="me-4">
          Already a member?
        </div>
        <NuxtLink to="/login">Login</NuxtLink>
      </div>
      <ProcessButton
        class="d-block mx-auto my-12"
        width="200"
        height="50"
        :func="signUp"
      >
        Sign Up</ProcessButton>
    </v-form>
  </v-card>
</template>

<style scoped>
</style>
