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

    if (window.history.state.back === null) {
      router.replace('/')
    }
    else {
      router.back()
    }
  }
  else {
    throwResponseError(res)
  }
}
</script>

<template>
  <div class="my-auto pa-2">
    <v-card
      class="mx-auto px-4 px-sm-10 py-10"
      color="secondary"
      :max-width="400"
    >
      <Text class="mb-16 text-h2 text-center text-logo">
        sign up
      </Text>
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
          <Text class="me-4">
            Already a member?
          </Text>
          <NuxtLink
            to="/login"
            :replace="true"
          >Login</NuxtLink>
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
  </div>
</template>

<style scoped>
</style>
